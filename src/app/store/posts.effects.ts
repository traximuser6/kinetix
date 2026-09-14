import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PostsActions from './posts.actions';
import { PostService } from '../services/post.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      mergeMap(() =>
        this.postService.getPosts().pipe(
          map((posts) => PostsActions.loadPostsSuccess({ posts })),
          catchError((error) => of(PostsActions.loadPostsFailure({ error }))),
        ),
      ),
    ),
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.addPost),
      mergeMap((action) =>
        this.postService.addPost(action.post).pipe(
          map((post) => PostsActions.addPostSuccess({ post })),
          catchError((error) => of(PostsActions.addPostFailure({ error }))),
        ),
      ),
    ),
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.updatePost),
      mergeMap((action) =>
        this.postService.updatePost(action.post).pipe(
          map((post) => PostsActions.updatePostSuccess({ post })),
          catchError((error) => of(PostsActions.updatePostFailure({ error }))),
        ),
      ),
    ),
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.deletePost),
      mergeMap((action) =>
        this.postService.deletePost(action.id).pipe(
          map((success) => PostsActions.deletePostSuccess({ id: action.id })),
          catchError((error) => of(PostsActions.deletePostFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private postService: PostService) {}
}
