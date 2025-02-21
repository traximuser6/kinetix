// src/app/components/post-edit/post-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatFormField,
    MatLabel,
    MatInput,
    MatSlideToggle,
    MatButton
  ],
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})

export class PostEditComponent implements OnInit {
  postForm: FormGroup;
  post: Post | undefined;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize the form with default values
    this.postForm = this.fb.group({
      title: [''],
      slug: [''],
      excerpt: [''],
      description: [''],
      is_published: [false]
    });
  }

  ngOnInit(): void {
    // Get the post ID from the route
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.postService.getPost(id).subscribe({
        next: (post) => {
          this.post = post;
          if (post) {
            // Patch the form with the post data
            this.postForm.patchValue(post);
          }
        },
        error: (err) => console.error('Error fetching post:', err)
      });
    } else {
      console.error('Invalid post ID.');
    }
  }

  onSubmit(): void {
    if (this.postForm.valid && this.post) {
      const updatedPost: Post = {
        ...this.post,
        ...this.postForm.value,
        updated_at: new Date()
      };
      this.postService.updatePost(updatedPost).subscribe({
        next: () => {
          this.router.navigate(['/post', updatedPost.id]).then(r => console.log('Navigation result:', r));
        },
        error: (err) => console.error('Error updating post:', err)
      });
    }
  }
}