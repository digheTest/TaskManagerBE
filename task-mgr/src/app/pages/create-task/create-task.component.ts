import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.scss"]
})
export class CreateTaskComponent implements OnInit {
  mode = "create";

  task;
  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  processTask(task) {
    this.task = task;
    this.taskService.saveTask(this.task).subscribe(item => {
      console.log(item);
    });
  }
}
