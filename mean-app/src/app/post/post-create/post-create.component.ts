import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  entertedTitle = '';
  entertedContent = '';
  postCreated = new EventEmitter<Post>();

  constructor(public postService: PostService) { }

  ngOnInit(): void {
  }

  onAddPost(postForm: NgForm){
    this.postService.addPost(postForm.value.title,postForm.value.content);
    postForm.resetForm();
  }
}
