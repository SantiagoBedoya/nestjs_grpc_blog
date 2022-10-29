import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserModule } from './user.module';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(UserModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5001',
      package: 'user',
      protoPath: join(process.cwd(), 'proto/user.proto'),
    },
  });
  await app.startAllMicroservices();
  logger.log('User service started');
}
bootstrap();
