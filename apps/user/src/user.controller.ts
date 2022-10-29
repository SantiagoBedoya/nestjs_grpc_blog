import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  ValidateRequest,
  ValidateResponse,
} from '@app/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'SignIn')
  signIn(data: SignInRequest): Promise<SignInResponse> {
    return this.userService.signIn(data);
  }

  @GrpcMethod('UserService', 'SignUp')
  signUp(data: SignUpRequest): Promise<SignInResponse> {
    return this.userService.signUp(data);
  }

  @GrpcMethod('UserService', 'Validate')
  validate(data: ValidateRequest): Promise<ValidateResponse> {
    return this.userService.validate(data);
  }
}
