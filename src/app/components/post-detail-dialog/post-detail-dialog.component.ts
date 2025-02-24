import { Component, Inject, inject } from '@angular/core';
import { Post } from '../../models/post.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-post-detail-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatSlideToggle,
    DatePipe
  ],
  template: `
    <mat-dialog-content>
      <mat-card class="post-detail-card">
        <mat-card-title>{{ data.post.title }}</mat-card-title>
        <mat-card-subtitle>Slug: {{ data.post.slug }}</mat-card-subtitle>
        <mat-card-content>
          <p><strong>Excerpt:</strong> {{ data.post.excerpt }}</p>
          <p><strong>Description:</strong> {{ data.post.description }}</p>
          <p><strong>Published:</strong>
            <mat-slide-toggle [checked]="data.post.is_published" disabled class="full-width">
              {{ data.post.is_published ? 'Yes' : 'No' }}
            </mat-slide-toggle>
          </p>
          <p><strong>Created At:</strong> {{ data.post.created_at | date }}</p>
          <p><strong>Updated At:</strong> {{ data.post.updated_at | date }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="primary" (click)="dialogRef.close()">Close</button>
          <button mat-button color="accent" (click)="navigateToEdit()">Edit</button>
        </mat-card-actions>
      </mat-card>
    </mat-dialog-content>
  `,
  styleUrls: ['./post-detail-dialog.component.css']
})

export class PostDetailDialogComponent {
  protected dialogRef = inject(MatDialogRef<PostDetailDialogComponent>);
  private router = inject(Router);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { post: Post }) { }

  navigateToEdit(): void {
    this.dialogRef.close();
    this.router.navigate(['/edit', this.data.post.id]).then(() => {
      console.log('Navigated to edit page');
    });
  }
}