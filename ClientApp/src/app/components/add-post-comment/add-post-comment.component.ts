
import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { PostComment } from '../../model/post-comment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from '../../services/postService.service';
import { UserService } from '../../services/userService.service';
import { AuthorizeService } from 'src/api-authorization/authorize.service';


@Component({
    selector: 'app-add-post-comment',
    templateUrl: './add-post-comment.component.html',
    styleUrls: ['./add-post-comment.component.css']
})
export class AddPostCommentComponent implements OnInit {
    id: number;
    form: FormGroup;
    comment: PostComment;
    userName: string;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,private router: Router, private activatedRoute: ActivatedRoute, private postService: PostService, private authorizeService: AuthorizeService)
        {
            this.authorizeService.getUser().subscribe(x=> {this.userName=x.name})
        }
    ngOnInit() {
        this.form  = new FormGroup({
            content: new FormControl(''),
        });
        this.loadData();
    }
    loadData(){
        this.id = +this.activatedRoute.snapshot.paramMap.get('id');
        
    }
    onSubmit(){
        var comment = <PostComment>{};
        comment.postId = this.id;
        comment.userId = this.userName;
        comment.parentCommentId = null;
        comment.commentDate = new Date();
        comment.content = this.form.get("content").value;
        comment.likes = 0;
        comment.dislikes = 0;

        this.postService.postPostComment(comment).subscribe(result => {
            this.router.navigate(['/post/'+this.id+"/details"])
        }, error => console.error(error));
    }
    
   
}

