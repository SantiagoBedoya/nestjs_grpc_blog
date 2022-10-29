import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PostModule } from './post.module';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(PostModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5002',
      package: 'post',
      protoPath: join(process.cwd(), 'proto/post.proto'),
    },
  });
  await app.startAllMicroservices();
  logger.log('Post service started');
}
bootstrap();
