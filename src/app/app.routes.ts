import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './auth/auth.guard';
import { MultiStepPostFormComponent } from './components/multi-step-form/multi-step-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PostListComponent },
      { path: 'post/:id', component: PostDetailComponent },
      { path: 'create', component: PostCreateComponent },
      { path: 'edit/:id', component: PostEditComponent },
      { path: 'multi-step-create', component: MultiStepPostFormComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];
