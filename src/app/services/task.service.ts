import { TaskAdapter, TaskAdapterOne } from '@adapters/task.adapter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { ITask, ITaskCreateUpdate, ITaskInfoAll, ITaskInfoOne } from '@models/task.model';
import { map, Observable } from 'rxjs';

const { API_URL } = environment;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API_URL = `${API_URL}task`;
  http = inject(HttpClient);

  headers = new HttpHeaders({
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  });

  public createTask(task: Omit<ITask, 'id'>): Observable<ITaskCreateUpdate> {
    return this.http.post<ITaskCreateUpdate>(this.API_URL, task);
  }

  public getAllTasks(): Observable<ITask[]> {
    return this.http
      .get<ITaskInfoAll>(this.API_URL, { headers: this.headers })
      .pipe(map(info => TaskAdapter(info)));
  }

  public getTaskById(id: string): Observable<ITask> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<ITaskInfoOne>(url).pipe(map(info => TaskAdapterOne(info)));
  }

  public updateTask(task: ITask): Observable<ITaskCreateUpdate> {
    const url = `${this.API_URL}/${task._id}`;
    return this.http.put<ITaskCreateUpdate>(url, task, { headers: this.headers });
  }

  public deleteTask(id: string): Observable<ITaskCreateUpdate> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<ITaskCreateUpdate>(url);
  }
}
