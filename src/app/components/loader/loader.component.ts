import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  loaderService = inject(LoaderService);

  get isLoading() {
    return this.loaderService.isloading();
  }
}
