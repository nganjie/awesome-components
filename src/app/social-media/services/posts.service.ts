import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../models/post.model";
import { environment } from "../../../environments/environment.development";

@Injectable()

export class PostsServices{
    constructor(private http: HttpClient){}

    getsPosts():Observable<Post[]>{
        //console.log(this.http.get(`${environment.apiUrl}/posts`,{responseType: 'text'}))
        console.log(environment.apiUrl)
        return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
    }

    addNewComment(postCommented:{comment:string,postId:number})
    {
        console.log(postCommented);
    }
}