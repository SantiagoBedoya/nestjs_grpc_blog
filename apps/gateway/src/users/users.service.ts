import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { handleGrpcError, SignInResponse, RpcUserService } from '@app/common';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class UsersService implements OnModuleInit {
  private userService: RpcUserService;
  constructor(@Inject('USER_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<RpcUserService>('UserService');
  }

  async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    try {
      return await lastValueFrom(this.userService.signIn(signInDto));
    } catch (error) {
      handleGrpcError(error);
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<SignInResponse> {
    try {
      return await lastValueFrom(this.userService.signUp(signUpDto));
    } catch (err) {
      handleGrpcError(err);
    }
  }
}
