import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ITask } from '@models/task.model';

@Component({
  selector: 'app-taskcard',
  imports: [],
  standalone: true,
  templateUrl: './taskcard.component.html',
  styleUrl: './taskcard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskcardComponent {
  public task = input.required<ITask>();
  public editTask = output<ITask>();
  public toChangeStatus = output<ITask>();

  toEdit(task: ITask) {
    this.editTask.emit(task);
  }
  changeStatus(task: ITask) {
    this.toChangeStatus.emit(task);
  }
}
