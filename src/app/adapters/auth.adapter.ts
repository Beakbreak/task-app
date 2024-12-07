import { HttpResponse } from '@angular/common/http';
import { IAuthInfo } from '@models/auth.model';

export const AuthAdapter = (AuthInfo: HttpResponse<IAuthInfo>): string => {
  return AuthInfo.headers.get('auth-token') ?? '';
};
