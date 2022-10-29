import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.usersService.signIn(signInDto);
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.usersService.signUp(signUpDto);
  }
}
