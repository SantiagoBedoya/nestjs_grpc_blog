import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5001',
          package: 'user',
          protoPath: join(process.cwd(), 'proto/user.proto'),
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [ClientsModule],
})
export class UsersModule {}
