import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  throwGrpcError,
  ValidateRequest,
  ValidateResponse,
} from '@app/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: SignInRequest): Promise<SignInResponse> {
    const user = await this.findOneByEmail(data.email);
    if (!user) {
      throwGrpcError({
        message: 'invalid credentials (email)',
        statusCode: 401,
      });
    }
    const isMatch = await argon2.verify(user.password, data.password);
    if (!isMatch) {
      throwGrpcError({
        message: 'invalid credentials (password)',
        statusCode: 401,
      });
    }
    return { accessToken: this.jwtService.sign({ id: user.id }) };
  }

  async signUp(data: SignUpRequest): Promise<SignInResponse> {
    const user = await this.findOneByEmail(data.email);
    if (user) {
      throwGrpcError(
        JSON.stringify({
          message: 'email already in use',
          statusCode: 400,
        }),
      );
    }
    const hash = await argon2.hash(data.password);
    const newUser = this.userRepository.create({ ...data, password: hash });
    await this.userRepository.save(newUser);
    return {
      accessToken: this.jwtService.sign({ id: newUser.id }),
    };
  }

  async validate(data: ValidateRequest): Promise<ValidateResponse> {
    const user = await this.userRepository.findOneBy({ id: data.id });
    return {
      isValid: user ? true : false,
    };
  }

  private async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}
