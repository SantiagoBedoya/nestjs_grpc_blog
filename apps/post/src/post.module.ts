import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./apps/post/.env', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
