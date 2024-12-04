import { ITask, ITaskInfoAll, ITaskInfoOne } from '@models/task.model';

export const TaskAdapter = (taskInfo: ITaskInfoAll): ITask[] => {
  return taskInfo.response;
};
export const TaskAdapterOne = (taskInfo: ITaskInfoOne): ITask => {
  return taskInfo.response;
};
