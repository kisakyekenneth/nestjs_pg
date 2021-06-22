export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  //With "enum" we use a comma (,) at the end while in "Interfaces" we use (;)
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
