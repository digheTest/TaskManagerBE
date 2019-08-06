export class Task {
  id: number;
  task: string;
  startDate: Date;
  endDate: Date;
  priority: number;
  parentTask: number;
  parentTaskName: string;
  isCompleted: boolean;

  constructor(
    options: {
      id?: number;
      task?: string;
      startDate?: Date;
      endDate?: Date;
      priority?: number;
      parentTask?: number;
      parentTaskName?: string;
      isCompleted?: boolean;
    } = {}
  ) {
    this.id = options.id || 0;
    this.task = options.task || "";
    this.startDate = options.startDate || new Date();
    this.endDate = options.endDate || new Date();
    this.priority = options.priority || 0;
    this.parentTask = options.parentTask || 0;
    this.parentTaskName = options.parentTaskName || "";
    this.isCompleted = options.isCompleted || false;
  }
}
