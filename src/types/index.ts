export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  progress: number;
}