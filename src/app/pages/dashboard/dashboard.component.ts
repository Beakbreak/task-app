import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { emptyTask, ITask } from '@models/task.model';
import { TaskService } from '@services/task.service';
import { TaskcardComponent } from '@components/taskcard/taskcard.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [TaskcardComponent, ReactiveFormsModule],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  staticBackdrop = viewChild.required<ElementRef>('staticBackdrop');
  private taskService = inject(TaskService);
  private formBuilder = inject(FormBuilder);
  private renderer = inject(Renderer2);
  public tasks = signal<ITask[]>([]);
  public update = signal<boolean>(false);
  public updateTask = signal<ITask>(emptyTask);

  public createUpdateForm: FormGroup = this.formBuilder.group({
    _id: [''],
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void {
    this.getTasks();
  }
  public submitCreateUpdateForm() {
    if (this.update()) {
      this.taskService.updateTask(this.createUpdateForm.value).subscribe({
        next: response => {
          if (response.success) {
            this.getTasks();
          }
        },
        complete: () => {
          this.close();
        },
      });
    }
    if (!this.update()) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...data } = this.createUpdateForm.value;
      this.taskService.createTask(data).subscribe({
        next: response => {
          if (response.success) {
            this.getTasks();
          }
        },
        complete: () => {
          this.close();
        },
      });
    }
  }

  public getTasks() {
    this.taskService.getAllTasks().subscribe({
      next: response => {
        this.tasks.set(response);
      },
    });
  }

  public close() {
    this.createUpdateForm.markAsUntouched();
    this.createUpdateForm.reset();
    this.update.set(false);
    this.updateTask.set(emptyTask);
    const modal = this.staticBackdrop().nativeElement;
    modal.classList.remove('show', 'd-block');
    modal.style.display = 'none';
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
  }

  public editTask(task: ITask) {
    this.update.set(true);
    this.updateTask.set(task);
    this.createUpdateForm.patchValue(task);
    const modal = this.staticBackdrop().nativeElement;
    modal.classList.add('show', 'd-block');
    modal.style.display = 'block';
    const backdrop = this.renderer.createElement('div');
    this.renderer.addClass(backdrop, 'modal-backdrop');
    this.renderer.addClass(backdrop, 'fade');
    this.renderer.addClass(backdrop, 'show');
    this.renderer.appendChild(document.body, backdrop);
  }

  public toChangeStatus(task: ITask) {
    task.done = !task.done;
    this.taskService.updateTask(task).subscribe({
      next: response => {
        if (response.success) {
          this.getTasks();
        }
      },
    });
  }

  public toDeleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: response => {
        if (response.success) {
          this.getTasks();
        }
      },
    });
  }

  disabledUpdate() {
    const toUpdate = this.createUpdateForm.value;
    toUpdate.done = this.updateTask().done;
    return JSON.stringify(toUpdate) === JSON.stringify(this.updateTask());
  }
  get title(): AbstractControl | null {
    return this.createUpdateForm.get('title');
  }
  get description(): AbstractControl | null {
    return this.createUpdateForm.get('description');
  }
}
