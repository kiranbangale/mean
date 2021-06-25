import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSub!: Subscription;
  // posts=[
    // {title:"First post", content: "This is First post's content"},
    // {title:"Second post", content: "This is Second post's content"},
    // {title:"Third post", content: "This is Third post's content"}
  // ];
  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.posts=this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListener().subscribe((posts: Post[])=>{
      this.posts=posts;
    });
  }

  ngOnDestroy(): void{
    this.postSub.unsubscribe();
  }

}
