
import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { PostComment } from '../../model/post-comment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { PostService } from '../../services/postService.service';


@Component({
    selector: 'app-post-comment',
    templateUrl: './post-comment.component.html',
    styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {
    id: number;
    public comments: PostComment[];
    public isAuthenticated: Observable<boolean>;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,private router: Router, private activatedRoute: ActivatedRoute, private authorizeService: AuthorizeService, private postService: PostService)
        {

        }
    ngOnInit() {
        this.id = +this.activatedRoute.snapshot.paramMap.get('id');
        this.postService.getPostComments(this.id)
        .subscribe(result => {
            this.comments = result;
            this.comments.map(c=>c.parentCommentName=this.getUserNameOfComment(c.id));
        },error => console.error(error));
        this.isAuthenticated = this.authorizeService.isAuthenticated();
    }

    addComment(){
        this.router.navigate(['/post/'+this.id+"/AddComment"])
    }
    getUserNameOfComment(id: number)
    {
        var comment = this.comments.find(c=>c.id==id)
        return comment.user.userName;
    }
    
    
   
}

