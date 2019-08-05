import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { validDateCheck } from "src/app/utils/valid-date";
import { MatSnackBar } from "@angular/material";
import { Task } from "src/app/models/task";
import { TaskService } from "src/app/services/task.service";
import { of } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-task-editor",
  templateUrl: "./task-editor.component.html",
  styleUrls: ["./task-editor.component.scss"]
})
export class TaskEditorComponent implements OnInit {
  @Input() mode;

  @Input("task") taskObj: Task;

  @Output() emitTask = new EventEmitter();

  taskForm: FormGroup;

  title: string;
  btnTxt: string;

  parents: any;

  filteredParents;

  constructor(
    private taskService: TaskService,
    private _snackBar: MatSnackBar
  ) {
    this.parents = this.taskService.getAllParentTasks();
  }

  ngOnInit() {
    this.title = this.mode === "create" ? "Add Task" : "Edit Task";
    this.btnTxt = this.mode === "create" ? "Save" : "Update";

    this.taskObj = this.taskObj || new Task();

    let parentTask = this.taskService.getParentTask(this.taskObj.parentTask);

    let taskFormGroup = {
      task: new FormControl(this.taskObj.task || "", Validators.required),
      priority: new FormControl(
        this.taskObj.priority || "0",
        Validators.required
      ),
      parentTask: new FormControl(parentTask ? parentTask.ParentTaskName : ""),
      startDate: new FormControl(this.taskObj.startDate || new Date(), [
        Validators.required,
        validDateCheck
      ]),
      endDate: new FormControl(
        this.taskObj.endDate || new Date(),
        validDateCheck
      )
    };

    taskFormGroup.endDate.valueChanges.subscribe(() =>
      this._snackBar.dismiss()
    );

    taskFormGroup.startDate.valueChanges.subscribe(() =>
      this._snackBar.dismiss()
    );

    this.filteredParents = taskFormGroup.parentTask.valueChanges.pipe(
      startWith(""),
      map(val => (val ? this._filterParentTasks(val) : this.parents.slice()))
    );

    this.taskForm = new FormGroup(taskFormGroup);
  }

  _filterParentTasks(val) {
    const filterValue = val.toLowerCase();
    return this.parents.filter(
      parent => parent.ParentTaskName.toLowerCase().indexOf(filterValue) === 0
    );
  }

  processTaskForm(taskFormObj) {
    if (
      taskFormObj.endDate &&
      taskFormObj.endDate - taskFormObj.startDate < 0
    ) {
      this._snackBar.open("Mentioned End Date is prior to Start Date");
      this.taskForm.get("endDate").setErrors({ validRange: false });
    } else {
      let parentTask = this.parents.find(
        parent => parent.ParentTaskName === taskFormObj.parentTask
      );
      let parentTaskID = parentTask ? parentTask.ParentTaskID : -1;
      this.emitTask.emit(
        Object.assign(taskFormObj, { parentTask: parentTaskID })
      );
    }
  }
}
