import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { Task } from "src/app/models/task";

@Component({
  selector: "app-view-tasks",
  templateUrl: "./view-tasks.component.html",
  styleUrls: ["./view-tasks.component.scss"]
})
export class ViewTasksComponent implements OnInit {
  allTasks: any;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.allTasks = this.taskService.getAllTasks();
  }

  refresh() {
    this.allTasks = this.taskService.getAllTasks();
  }
}
