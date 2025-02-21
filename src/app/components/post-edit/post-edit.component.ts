import { Component } from '@angular/core';
import { Post } from "../../models/post.model";
import { PostService } from "../../services/post.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-post-edit',
  standalone: true, 
  imports: [],
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.css'
})

export class PostEditComponent {

  post: Post | undefined;

  // todo : dig deeper what is ActivatedRoute and Router
  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    // todo : getting the id from the route, dig dive
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(id).subscribe(post => this.post = post);
  }

  onSubmit(): void {
    if (this.post) {
      // todo : dig deeper, what is router.navigate
      this.postService.updatePost(this.post).subscribe(() => {
        this.router.navigate(['/']).then(r => console.log(r));
      });
    }
  }

}
