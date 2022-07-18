import { I } from "@angular/cdk/keycodes";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { MatGridTileHeaderCssMatStyler, PageEvent } from "@angular/material";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthorizeService } from "src/api-authorization/authorize.service";
import { Equipment } from "../model/equipment";
import { PostComment } from "../model/post-comment";
import { Post } from "../model/post";
import { PostEquipment } from "../model/post-equipment";
import { PostLikes } from "../model/PostLikes";
@Injectable({
    providedIn: 'root'
})
export class PostService {

    userName: string;
    role: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,public authorizeService: AuthorizeService)
    {
        this.authorizeService.getUser().subscribe(x=> {
            if(x == null)
                this.userName =null
            else
             this.userName=x.name}
        )
    }
    getLikedPosts() : Observable<PostLikes[]>
    {
        if(this.userName ==null)
            return of();

        var url = this.baseUrl + 'api/PostLikes'
        var params = new HttpParams().set("userName", this.userName);
        return this.http.get<PostLikes[]>(url,{params})
    }
    getPosts(event: PageEvent, sortColumn: string, sortOrder: string, filterColumn: string, filterQuery: string, equipment: string = null)
    {

        var url = this.baseUrl + 'api/Post'
        var params = new HttpParams()
            .set("pageIndex", event.pageIndex.toString())
            .set("pageSize", event.pageSize.toString())
            .set("sortColumn", sortColumn)
            .set("sortOrder", sortOrder)
        if(filterQuery)
        {
            params = params
                .set("filterColumn",filterColumn)
                .set("filterQuery",filterQuery);
        }
        if(equipment)
        {
            params = params.set("equipment", equipment);
        }
        return this.http.get<any>(url, {params});
    }
    getPost(id: number)
    {
        var url = this.baseUrl + "api/Post/"+id;
        return this.http.get<Post>(url)
    }
    deleteLikedPost(id: number)
    {
        var url2 = this.baseUrl + "api/PostLikes";
        return this.http.delete<PostLikes>(url2+'/'+id);
    }
    postLikedPost(postLike: PostLikes)
    {
        console.log(postLike)
        var url2 = this.baseUrl + "api/PostLikes";
        return this.http.post<PostLikes>(url2, postLike);
    }
    putPost(post: Post)
    {
        var url = this.baseUrl + "api/Post/"+post.id;
        return this.http.put<Post>(url,post);
    }
    putPostWithoutEquipment(post: Post)
    {
        var url = this.baseUrl + "api/Post";
        return this.http.put<Post>(url,post);
    }

    postPost(post: Post)
    {
        var url = this.baseUrl + "api/Post";
        return  this.http.post<Post>(url,post);
    }
    getPostComments(id: number)
    {
        var url = this.baseUrl + "api/PostComment/"+ id;
        return this.http.get<PostComment[]>(url);
    }
    postPostComment(comment: PostComment)
    {
        var url = this.baseUrl + "api/PostComment";
        return this.http.post<PostComment>(url, comment);
    }
    deletePost(id: number)
    {
        var url = this.baseUrl + "api/Post/"+id;
        return this.http.delete<Post>(url);
    }
    deletePostComment(id: number)
    {
        var url = this.baseUrl + "api/PostComment/"+id;
        return this.http.delete<PostComment>(url);
    }
    addPostEquipment(postEquipment: PostEquipment)
    {
        var url = this.baseUrl + "api/PostEquipment"
        return this.http.post<PostEquipment[]>(url, postEquipment);
    }
    getPostEquipment(){
        var url = this.baseUrl + "api/PostEquipment";
        return this.http.get<PostEquipment[]>(url);
    }
}