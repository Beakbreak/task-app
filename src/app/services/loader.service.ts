import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isloading = signal<boolean>(false);
  public show() {
    this.isloading.set(true);
  }
  public hide() {
    this.isloading.set(false);
  }
}
