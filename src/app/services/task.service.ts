import { TaskAdapter, TaskAdapterOne } from '@adapters/task.adapter';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { ITask, ITaskInfoAll, ITaskInfoOne } from '@models/task.model';
import { map, Observable } from 'rxjs';

const { API_URL } = environment;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API_URL = `${API_URL}task`;
  http = inject(HttpClient);

  public createTask(task: Omit<ITask, 'id'>): Observable<void> {
    return this.http.post<void>(this.API_URL, task);
  }

  public getAllTasks(): Observable<ITask[]> {
    return this.http.get<ITaskInfoAll>(this.API_URL).pipe(map(info => TaskAdapter(info)));
  }

  public getTaskById(id: string): Observable<ITask> {
    const url = `${this.API_URL}${id}`;
    return this.http.get<ITaskInfoOne>(url).pipe(map(info => TaskAdapterOne(info)));
  }

  public updateTask(task: ITask): Observable<void> {
    const url = `${this.API_URL}${task._id}`;
    return this.http.put<void>(url, task);
  }

  public deleteTask(id: string): Observable<void> {
    const url = `${this.API_URL}${id}`;
    return this.http.delete<void>(url);
  }
}
