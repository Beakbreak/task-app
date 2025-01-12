import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  public AuthForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  public redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  public redirectToRegister() {
    this.router.navigate(['/register']);
  }

  public submitAuthForm() {
    const formData = this.AuthForm.value;

    this.authService.signIn(formData).subscribe({
      next: resp => {
        if (resp) {
          console.log(resp)
          this.authService.saveToken(resp);
          this.authService.setAuthenticate();
          this.redirectToDashboard();
        }
      },
      error: error => {
        if (error.error.error === 'email not found') {
          this.email?.setErrors({ customError: true });
        }
        if (error.error.error === 'incorrect Password') {
          this.password?.setErrors({ customError: true });
        }
        this.AuthForm.setErrors({ invalid: true });
      },
    });
  }

  get email(): AbstractControl | null {
    return this.AuthForm.get('email');
  }
  get password(): AbstractControl | null {
    return this.AuthForm.get('password');
  }
}
