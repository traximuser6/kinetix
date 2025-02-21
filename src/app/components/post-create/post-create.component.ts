import { Component } from '@angular/core';
import { Post } from "../../models/post.model";
import { PostService } from "../../services/post.service";
import { Router, RouterLink } from "@angular/router";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"; // ✅ Import FormBuilder and Validators
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule, // ✅ Required for FormGroup to work
    MatFormField,
    MatSlideToggle,
    MatButton,
    MatInput,
    RouterLink,
    MatLabel
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})

export class PostCreateComponent {
  form: FormGroup; // ✅ Declare the form property

  constructor(
    private postService: PostService,
    private router: Router,
    private fb: FormBuilder // ✅ Inject FormBuilder
  ) {
    // ✅ Initialize the form
    this.form = this.fb.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      excerpt: ['', Validators.required],
      description: ['', Validators.required],
      is_published: [false],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const newPost: Post = {
      id: 0,
      ...this.form.value, // ✅ Get values from the form
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.postService.addPost(newPost).subscribe(() => {
      this.router.navigate(['/']).then(r => console.log(r));
    });
  }
}
