export class Task {
  id: number;
  task: string;
  startDate: Date;
  endDate: Date;
  priority: number;
  parentTask: number;

  constructor(
    options: {
      id?: number;
      task?: string;
      startDate?: Date;
      endDate?: Date;
      priority?: number;
      parentTask?: number;
    } = {}
  ) {
    this.id = options.id || 0;
    this.task = options.task || "";
    this.startDate = options.startDate || new Date();
    this.endDate = options.endDate || new Date();
    this.priority = options.priority || 0;
    this.parentTask = options.parentTask || 0;
  }
}
