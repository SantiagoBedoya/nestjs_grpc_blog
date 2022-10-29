import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreatePostRequest, GetPostsRequest } from '@app/common';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @GrpcMethod('PostService', 'GetPosts')
  getPosts(data: GetPostsRequest) {
    return this.postService.getPosts(data);
  }

  @GrpcMethod('PostService', 'CreatePost')
  createPost(data: CreatePostRequest) {
    return this.postService.createPost(data);
  }
}
