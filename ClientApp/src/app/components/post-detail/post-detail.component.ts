import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { Post } from '../../model/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { PostService } from '../../services/postService.service';


@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
    id: number;
    post: Post;
    equipment: string;
    userName: string;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,private router: Router, private activatedRoute: ActivatedRoute, private authorizeService: AuthorizeService, private postService: PostService)
        {
            this.authorizeService.getUser().subscribe(x=> {
                if(x==null)
                    this.userName=null;
                else
                    this.userName=x.name
            });
        }
        ngOnInit() {
            
            this.id = +this.activatedRoute.snapshot.paramMap.get('id');
            this.postService.getPost(this.id).subscribe(result => {
                this.post = result;
                this.equipment = this.post.equipment.map((e)=>e.name).join(', ');
                console.log(result)
            },error => console.error(error));


        }
}

