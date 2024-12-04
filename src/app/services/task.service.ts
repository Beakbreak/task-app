import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment';

const { API_URL } = environment;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API_URL = API_URL;
  http = inject(HttpClient);
}
