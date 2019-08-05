import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { ActivatedRoute } from "@angular/router";
import { Task } from "src/app/models/task";

@Component({
  selector: "app-update-task",
  templateUrl: "./update-task.component.html",
  styleUrls: ["./update-task.component.scss"]
})
export class UpdateTaskComponent implements OnInit {
  taskObj;
  taskID: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.taskID = params.get("taskID");
      this.taskObj = this.taskService.getTask(this.taskID);
    });
  }

  processTask(taskObj) {
    this.taskService.saveTask(Object.assign(taskObj, { id: this.taskID }));
  }
}
