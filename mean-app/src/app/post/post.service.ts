import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class PostService {
  private posts: Post[]=[];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
    .pipe(map((res) => {
      return res.posts.map((post: { title: any; content: any; _id: any; }) => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe((postData)=>{
      this.posts = postData;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title:string, content:string){
    const post: Post = {id:'', title:title,content:content};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts',post)
    .subscribe((res)=>{
      const postId = res.postId;
      post.id = postId;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
  }

  deletePost(id: string){
    this.http.delete('http://localhost:3000/api/posts/'+id)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== id);
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }
}
