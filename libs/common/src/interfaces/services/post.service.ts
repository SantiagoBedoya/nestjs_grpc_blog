import { Observable } from 'rxjs';
import { CreatePostRequest } from '../request/post/create-post.request';
import { GetPostsRequest } from '../request/post/get-posts.request';
import { CreatePostResponse } from '../response/post/create-post.response';
import { GetPostResponse } from '../response/post/get-posts.response';

export interface RpcPostService {
  getPosts(data: GetPostsRequest): Observable<GetPostResponse>;
  createPost(data: CreatePostRequest): Observable<CreatePostResponse>;
}
