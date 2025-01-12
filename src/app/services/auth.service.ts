import { AuthAdapter } from '@adapters/auth.adapter';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@envs/environment';
import { IAuthInfo, ISignIn, ISignUp } from '@models/auth.model';
import { map, Observable } from 'rxjs';

const { API_URL } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${API_URL}`;
  public isAuthenticated = signal<boolean>(false);
  public userName = signal<string>('');

  http = inject(HttpClient);

  public signUp(signUp: ISignUp): Observable<string> {
    const url = `${this.API_URL}signup`;

    return this.http
      .post<IAuthInfo>(url, signUp, {
        observe: 'response',
      })
      .pipe(map(info => AuthAdapter(info)));
  }

  public signIn(signIn: ISignIn): Observable<string> {
    const url = `${this.API_URL}api/login`;

    return this.http
      .post<IAuthInfo>(url, signIn, {
        observe: 'response',
      })
      .pipe(map(info => AuthAdapter(info)));
  }

  public setAuthenticate(): void {
    this.isAuthenticated.set(true);
  }

  public setUserName(name: string): void {
    this.userName.set(name);
  }

  public saveToken(data: string): void {
    sessionStorage.setItem('auth-token', data);
  }

  public getToken(): string {
    return sessionStorage.getItem('auth-token') ?? '';
  }

  public logout(): void {
    this.isAuthenticated.set(false);
    sessionStorage.clear();
  }
}
