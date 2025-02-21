// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';

export const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:id', component: PostEditComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];