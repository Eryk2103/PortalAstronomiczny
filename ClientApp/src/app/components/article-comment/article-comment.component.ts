
import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { ArticleComment } from '../../model/article-comment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { ArticleService } from '../../services/articleService.service';
import { C } from '@angular/cdk/keycodes';


@Component({
    selector: 'app-article-comment',
    templateUrl: './article-comment.component.html',
    styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnInit {
    id: number;
    public comments: ArticleComment[];
    public isAuthenticated: Observable<boolean>;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,private router: Router, private activatedRoute: ActivatedRoute, private authorizeService: AuthorizeService, private articleService: ArticleService)
        {

        }
    ngOnInit() {
        this.id = +this.activatedRoute.snapshot.paramMap.get('id');

        this.articleService.getArticleComments(this.id).subscribe(result => {
            this.comments = result;
            this.comments.map(c=>c.parentCommentName=this.getUserNameOfComment(c.id))
        },error => console.error(error));

        this.isAuthenticated = this.authorizeService.isAuthenticated();
    }

    addComment(){
        this.router.navigate(['/article/'+this.id+"/AddComment"])
    }
    
    getUserNameOfComment(id: number)
    {
        var comment = this.comments.find(c=>c.id==id)
        return comment.user.userName;
    }
    
   
}

