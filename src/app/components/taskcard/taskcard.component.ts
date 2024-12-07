import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
}
