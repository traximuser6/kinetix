import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from '../../services/post.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post-list',
  standalone: true, // in angular 19, we don't need to do this
  imports: [
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})

export class PostListComponent implements OnInit {

  posts: Post[] = [];
  dataSource = new MatTableDataSource<Post>(this.posts);
  displayedColumns: string[] = ['id', 'title', 'slug', 'is_published', 'actions'];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.dataSource.data = this.posts;
    })
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.dataSource.data = this.posts;
    })
  }

}
