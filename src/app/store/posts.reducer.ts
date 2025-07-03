import { createReducer, on, Action } from '@ngrx/store';
import { Post } from '../models/post.model';
import * as PostsActions from './posts.actions';

export const postsFeatureKey = 'posts';

export interface State {
  posts: Post[];
  error: any;
}

export const initialState: State = {
  posts: [],
  error: null,
};

const postsReducerInternal = createReducer(
  initialState,
  on(PostsActions.loadPostsSuccess, (state, { posts }) => ({ ...state, posts })),
  on(PostsActions.loadPostsFailure, (state, { error }) => ({ ...state, error })),

  on(PostsActions.addPostSuccess, (state, { post }) => ({ ...state, posts: [...state.posts, post] })),
  on(PostsActions.addPostFailure, (state, { error }) => ({ ...state, error })),

  on(PostsActions.updatePostSuccess, (state, { post }) => ({
    ...state,
    posts: state.posts.map(p => (p.id === post.id ? post : p)),
  })),
  on(PostsActions.updatePostFailure, (state, { error }) => ({ ...state, error })),

  on(PostsActions.deletePostSuccess, (state, { id }) => ({
    ...state,
    posts: state.posts.filter(p => p.id !== id),
  })),
  on(PostsActions.deletePostFailure, (state, { error }) => ({ ...state, error }))
);

export function postsReducer(state: State | undefined, action: Action) {
  return postsReducerInternal(state, action);
}
