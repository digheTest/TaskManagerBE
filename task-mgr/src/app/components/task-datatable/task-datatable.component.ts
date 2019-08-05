import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { Task } from "src/app/models/task";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { of } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-task-datatable",
  templateUrl: "./task-datatable.component.html",
  styleUrls: ["./task-datatable.component.scss"]
})
export class TaskDatatableComponent implements OnInit, OnChanges {
  allColumns = [
    "task",
    "parent",
    "priority",
    "startDate",
    "endDate",
    "actions"
  ];

  filterForm: FormGroup;

  filters = [];

  @Input() tasks;

  @Output() refresh = new EventEmitter();

  dataSource = new MatTableDataSource();

  filterValues = {
    task: "",
    parentTask: "",
    priorityFrom: "",
    priorityTo: "",
    startDate: "",
    endDate: ""
  };

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnChanges() {
    if (this.tasks) {
      of(this.tasks).subscribe(tasks => (this.dataSource.data = tasks));
    }
  }

  ngOnInit() {
    let filterFormGroup = {
      task: new FormControl(),
      parentTask: new FormControl(),
      priorityFrom: new FormControl(),
      priorityTo: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl()
    };

    filterFormGroup.task.valueChanges.subscribe(task => {
      this.filterValues.task = task;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    filterFormGroup.parentTask.valueChanges.subscribe(parentTask => {
      this.filterValues.parentTask = parentTask;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    filterFormGroup.priorityFrom.valueChanges.subscribe(priorityFrom => {
      this.filterValues.priorityFrom = priorityFrom;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    filterFormGroup.priorityTo.valueChanges.subscribe(priorityTo => {
      this.filterValues.priorityTo = priorityTo;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    filterFormGroup.startDate.valueChanges.subscribe(startDate => {
      this.filterValues.startDate = startDate;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    filterFormGroup.endDate.valueChanges.subscribe(endDate => {
      this.filterValues.endDate = endDate;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.filterForm = new FormGroup(filterFormGroup);

    this.dataSource.filterPredicate = this.createFilter();
  }

  createFilter() {
    let self = this;
    return function(data, filter) {
      let searchTerms = JSON.parse(filter);
      let taskCheck = data.task.toLowerCase().indexOf(searchTerms.task) !== -1;
      let parentTaskCheck =
        self.taskService
          .getParentTask(data.parentTask)
          .ParentTaskName.toLowerCase()
          .indexOf(searchTerms.parentTask) !== -1;
      let priorityFromCheck = searchTerms.priorityFrom
        ? parseInt(data.priority) >= parseInt(searchTerms.priorityFrom)
        : true;
      let priorityToCheck = searchTerms.priorityTo
        ? parseInt(searchTerms.priorityTo) >= parseInt(data.priority)
        : true;
      let startDateCheck = searchTerms.startDate
        ? +new Date(searchTerms.startDate) - +data.startDate >= 0
        : true;
      let endDateCheck = searchTerms.endDate
        ? +data.endDate - +new Date(searchTerms.endDate) >= 0
        : true;

      return (
        taskCheck &&
        parentTaskCheck &&
        priorityFromCheck &&
        priorityToCheck &&
        startDateCheck &&
        endDateCheck
      );
    };
  }

  edit(task: Task) {
    this.router.navigate(["/update", task.id]);
  }

  endTask(task: Task) {
    this.taskService.endTask(task).subscribe(item => this.refresh.emit(item));
  }

  getParentTask(parentTaskId) {
    return this.taskService.getParentTask(parentTaskId);
  }
}
