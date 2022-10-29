import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./apps/gateway/.env', '.env'],
      isGlobal: true,
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class GatewayModule {}
