import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatButton } from "@angular/material/button";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-post-detail',
  standalone: true, // in angular 19, we don't need to do this
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    RouterLink,
    MatButton,
    DatePipe
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})

export class PostDetailComponent implements OnInit {

  post: Post | undefined;

  constructor(private postService: PostService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // todo : dig dive into this deeper (route param map)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(id).subscribe(post => this.post = post)
  }

}
