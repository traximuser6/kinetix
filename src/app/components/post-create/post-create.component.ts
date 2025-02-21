import { Component } from '@angular/core';
import { Post } from "../../models/post.model";
import { PostService } from "../../services/post.service";
import { Router, RouterLink } from "@angular/router";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-post-create',
  standalone: true, // in angular 19, we don't need to do this
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatSlideToggle,
    MatButton,
    MatInput,
    RouterLink,
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {

  post: Post = {
    id: 0,
    title: '',
    slug: '',
    excerpt: '',
    description: '',
    is_published: false,
    created_at: new Date(),
    updated_at: new Date(),
  }

  constructor(private postService: PostService, private router: Router) {
  }

  onSubmit() {
    this.postService.addPost(this.post).subscribe(() => {
      this.router.navigate(['/']).then(r => console.log(r));
    })
  }

}
