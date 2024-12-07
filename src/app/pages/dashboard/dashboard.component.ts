import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ITask } from '@models/task.model';
import { TaskService } from '@services/task.service';
import { Observable } from 'rxjs';
import { TaskcardComponent } from '@components/taskcard/taskcard.component';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, TaskcardComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  private taskService = inject(TaskService);

  tasks$: Observable<ITask[]> = this.taskService.getAllTasks();
}
