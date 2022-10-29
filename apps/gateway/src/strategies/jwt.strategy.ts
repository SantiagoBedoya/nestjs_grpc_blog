import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { RpcUserService } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy)
  implements OnModuleInit
{
  private userService: RpcUserService;

  constructor(
    private readonly configService: ConfigService,
    @Inject('USER_SERVICE') private readonly client: ClientGrpc,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  onModuleInit() {
    this.userService = this.client.getService<RpcUserService>('UserService');
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const { isValid } = await lastValueFrom(this.userService.validate({ id }));
    if (!isValid) throw new UnauthorizedException();
    return id;
  }
}
