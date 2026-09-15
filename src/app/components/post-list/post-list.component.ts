import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule, // ✅ Add this
    DatePipe,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  dataSource = new MatTableDataSource<Post>(this.posts);

  displayedColumns: string[] = [
    'id',
    'title',
    'slug',
    'excerpt',
    'description',
    'is_published',
    'created_at',
    'actions',
  ];

  private postService = inject(PostService);
  private snackBar = inject(MatSnackBar); // ✅ Inject Snackbar
  private router = inject(Router);

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts.reverse();
      this.dataSource.data = this.posts;
    });
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(() => {
      this.loadPosts();
      this.showNotification('Post deleted successfully', 'undo');
    });
  }

  openPostDetail(post: Post): void {
    if (!post) return;
    // Keep dialog for detail view, or navigate to detail page
    this.router.navigate(['/posts', post.id]);
  }

  /** ✅ Reusable notification method */
  showNotification(message: string, action: string = 'Close'): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end', // Top-right corner
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'], // Custom styling hook
    });
  }
}
