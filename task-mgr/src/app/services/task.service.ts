import { Injectable } from "@angular/core";
import { Task } from "../models/task";
import { HttpClient } from "@angular/common/http";
import { map, mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  static BASE_URL =
    "https://a008e573-73ab-4aa2-b4f3-ef956100bbe7.mock.pstmn.io/api/values";

  tasks: Array<Task> = [];
  parentTasks: Array<any> = [];

  constructor(private http: HttpClient) {}

  saveTask(task) {
    if (task.parentTask) {
      let parentTask = this.parentTasks.find(
        parent => parent.ParentTaskID === task.parentTask
      );

      return this.http
        .post(`${TaskService.BASE_URL}/CreateParentTask`, {
          ParentTaskName: parentTask.ParentTaskName
        })
        .pipe(
          mergeMap(item =>
            this.http.post(`${TaskService.BASE_URL}/CreateTask`, {
              TaskName: task.task,
              StartDate: task.startDate,
              EndDate: task.endDate,
              Priority: task.priority,
              IsCompleted: false
            })
          )
        )
        .pipe(
          map(item => {
            return item;
          })
        );
    } else {
      return this.http.post(`${TaskService.BASE_URL}/CreateTask`, {
        TaskName: task.task,
        StartDate: task.startDate,
        EndDate: task.endDate,
        Priority: task.priority,
        IsCompleted: false
      });
    }
  }

  getTask(taskID) {
    return this.tasks.find(task => task.id == taskID);
  }

  getParentTask(parentTaskID) {
    return this.parentTasks.find(
      parent => parent.ParentTaskID === parentTaskID
    );
  }

  getAllParentTasks() {
    return this.parentTasks;
  }

  getAllTasks() {
    return this.http.get(`${TaskService.BASE_URL}/Get`).pipe(
      map((res: any) => {
        let parentTasks = [];
        let tasks = [];
        res.forEach(parent => {
          if (parent.ParentTaskID === 0) {
            parent.ParentTaskName = "N/A";
          }
          parentTasks.push(parent);
          if (parent.Task.length) {
            parent.Task.forEach(task =>
              tasks.push(
                new Task({
                  id: task.TaskId,
                  task: task.TaskName,
                  priority: task.Priority,
                  parentTask: parent.ParentTaskID,
                  startDate: new Date(task.StartDate),
                  endDate: new Date(task.EndDate)
                })
              )
            );
          }
        });
        this.parentTasks = parentTasks;
        this.tasks = tasks;
        return tasks;
      })
    );
  }
}
