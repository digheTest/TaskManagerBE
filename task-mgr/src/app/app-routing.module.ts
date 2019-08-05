import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateTaskComponent } from "./pages/create-task/create-task.component";
import { UpdateTaskComponent } from "./pages/update-task/update-task.component";
import { ViewTasksComponent } from "./pages/view-tasks/view-tasks.component";
import { AppModule } from "./app.module";

const routes: Routes = [
  {
    path: "add",
    component: CreateTaskComponent
  },
  {
    path: "update/:taskID",
    component: UpdateTaskComponent
  },
  {
    path: "view",
    component: ViewTasksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
