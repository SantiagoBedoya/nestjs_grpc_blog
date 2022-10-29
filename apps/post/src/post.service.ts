import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostRequest, GetPostsRequest } from '../../../libs/common/src';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  async getPosts(data: GetPostsRequest) {
    const posts = await this.postRepository.find();
    return { posts };
  }
  async createPost(data: CreatePostRequest) {
    const post = this.postRepository.create(data);
    await this.postRepository.save(post);
    return { id: post.id };
  }
}
