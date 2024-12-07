export interface ITask {
  _id: string;
  title: string;
  description: string;
  done: boolean;
}

interface ITaskInfo {
  success: boolean;
}

export interface ITaskInfoAll extends ITaskInfo {
  response: ITask[];
}

export interface ITaskInfoOne extends ITaskInfo {
  response: ITask;
}

export const emptyTask = {
  _id: '',
  title: '',
  description: '',
  done: false,
};
