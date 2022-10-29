import { Observable } from 'rxjs';
import { SignInRequest } from '../request/auth/sign-in.request';
import { SignUpRequest } from '../request/auth/sign-up.request';
import { ValidateRequest } from '../request/auth/validate.request';
import { SignInResponse } from '../response/auth/sign-in.response';
import { ValidateResponse } from '../response/auth/validate.response';

export interface RpcUserService {
  signIn(data: SignInRequest): Observable<SignInResponse>;
  signUp(data: SignUpRequest): Observable<SignInResponse>;
  validate(data: ValidateRequest): Observable<ValidateResponse>;
}
