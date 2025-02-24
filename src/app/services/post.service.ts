import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { generateRandomNumber } from "../utils/utils";

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts: Observable<Post[]> = this.postsSubject.asObservable();
  private postsUrl = 'assets/posts.json';

  constructor(private http: HttpClient) {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.http.get<Post[]>(this.postsUrl).pipe(
      map(posts => posts.map(post => ({
        ...post,
        created_at: new Date(post.created_at),
        updated_at: new Date(post.updated_at)
      }))),
      tap(posts => this.postsSubject.next(posts))
    ).subscribe({
      // todo : add a gentle warning toastr showing the given message
      error: (err) => console.error('Error loading posts from JSON:', err)
    });
  }

  getPosts(): Observable<Post[]> {
    return this.posts;
  }

  getPost(id: number): Observable<Post | undefined> {
    return this.posts.pipe(
      map(posts => posts.find(post => post.id === id))
    );
  }

  addPost(post: Post): Observable<Post> {

    const newPost: Post = {
      ...post,
      id: generateRandomNumber(),
      created_at: new Date(),
      updated_at: new Date()
    };

    const currentPosts = this.postsSubject.value;
    const updatedPosts = [...currentPosts, newPost];
    this.postsSubject.next(updatedPosts);
    return of(newPost);
  }

  updatePost(post: Post): Observable<Post> {
    const currentPosts = this.postsSubject.value;
    const updatedPosts = currentPosts.map(p => p.id === post.id ? { ...post, updated_at: new Date() } : p);
    this.postsSubject.next(updatedPosts);
    return of(post);
  }

  deletePost(id: number): Observable<boolean> {
    const currentPosts = this.postsSubject.value;
    const updatedPosts = currentPosts.filter(post => post.id !== id);
    this.postsSubject.next(updatedPosts);
    return of(updatedPosts.length < currentPosts.length);
  }

}