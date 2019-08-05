import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "task-mgr";
  navLinks = [
    {
      path: ["/view"],
      label: "View Tasks"
    },
    {
      path: ["/add"],
      label: "Add Task"
    }
  ];
  activeLink;
}
