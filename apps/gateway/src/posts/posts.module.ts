import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5002',
          package: 'post',
          protoPath: join(process.cwd(), 'proto/post.proto'),
        },
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
