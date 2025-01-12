import { HttpResponse } from '@angular/common/http';
import { IAuthInfo } from '@models/auth.model';

export const AuthAdapter = (AuthInfo: HttpResponse<IAuthInfo>): string => {

  // Ensure the body exists and extract the token
  const token = AuthInfo.body?.response ?? '';

  return token;
};
