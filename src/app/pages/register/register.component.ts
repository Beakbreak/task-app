import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  private passwordMatchValidator = (form: AbstractControl): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('verifyPassword')?.value;
    if (password !== confirmPassword) {
      form.get('verifyPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  };

  public RegisterForm: FormGroup = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      verifyPassword: ['', [Validators.required, Validators.minLength(3)]],
    },
    {
      validators: [this.passwordMatchValidator],
    }
  );

  public redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  public redirectToLogin() {
    this.router.navigate(['/login']);
  }

  public submitRegisterForm() {
    this.authService.signIn(this.RegisterForm.value).subscribe({
      next: resp => {
        if (resp) {
          this.authService.saveToken(resp);
          this.authService.setAuthenticate();
          this.redirectToDashboard();
        }
      },
    });
  }

  get name(): AbstractControl | null {
    return this.RegisterForm.get('name');
  }
  get lastName(): AbstractControl | null {
    return this.RegisterForm.get('lastName');
  }
  get userName(): AbstractControl | null {
    return this.RegisterForm.get('userName');
  }
  get email(): AbstractControl | null {
    return this.RegisterForm.get('email');
  }
  get password(): AbstractControl | null {
    return this.RegisterForm.get('password');
  }
  get verifyPassword(): AbstractControl | null {
    return this.RegisterForm.get('verifyPassword');
  }
}
