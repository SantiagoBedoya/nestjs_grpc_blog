import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { handleGrpcError, RpcPostService } from '@app/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PostsService implements OnModuleInit {
  private postService: RpcPostService;
  constructor(@Inject('POST_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.postService = this.client.getService<RpcPostService>('PostService');
  }

  async create(createPostDto: CreatePostDto, author: string) {
    try {
      const res = await lastValueFrom(
        this.postService.createPost({ ...createPostDto, author }),
      );
      return res;
    } catch (error) {
      console.log(error);
      handleGrpcError(error);
    }
  }

  async findAll(accessToken: string) {
    try {
      const res = await lastValueFrom(
        this.postService.getPosts({ accessToken }),
      );
      return res;
    } catch (error) {
      console.log(error);
      handleGrpcError(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
