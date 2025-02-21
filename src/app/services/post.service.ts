import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PostService {

  // define a private data variable
  private posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      slug: 'first-post',
      excerpt: 'A short summary',
      description: 'Detailed content here',
      is_published: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      title: 'Second Post',
      slug: 'second-post',
      excerpt: 'Another summary',
      description: 'More content here',
      is_published: false,
      created_at: new Date(),
      updated_at: new Date()
    }
  ];

  // define empty constructor i don't know why
  constructor() {
  }

  // now access modifier are needed with the methods inside the service, My assumption
  getPosts(): Observable<Post[]> {
    return of(this.posts);
  }

  // see more about Observable
  getPost(id: number): Observable<Post | undefined> {
    return of(this.posts.find(post => post.id === id));
  }

  addPost(post: Post): Observable<Post> {
    post.id = Math.floor(Math.random() * 100_000);
    post.created_at = new Date();
    post.updated_at = new Date();
    this.posts.push(post);
    return of(post)
  }

  updatePost(post: Post): Observable<Post> {
    const index = this.posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      post.updated_at = new Date();
      this.posts[index] = post;
    }

    return of(post);
  }

  deletePost(id: number): Observable<boolean> {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter(post => post.id != id);
    return of(this.posts.length < initialLength)
  }

}

