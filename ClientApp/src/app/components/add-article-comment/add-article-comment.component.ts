
import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { ArticleComment } from '../../model/article-comment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { ArticleService } from '../../services/articleService.service';


@Component({
    selector: 'app-add-article-comment',
    templateUrl: './add-article-comment.component.html',
    styleUrls: ['./add-article-comment.component.css']
})
export class AddArticleCommentComponent implements OnInit {
    id: number;
    form: FormGroup;
    comment: ArticleComment;
    userName: string;
    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,private router: Router, private activatedRoute: ActivatedRoute, private authorizeService: AuthorizeService, private articleService: ArticleService)
        {
            authorizeService.getUser().subscribe(x=>{
                this.userName=x.name;
            });
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

        var comment = <ArticleComment>{};
        comment.articleId = this.id;
        comment.userId = this.userName;
        comment.parentCommentId = null;
        comment.commentDate = new Date();
        comment.content = this.form.get("content").value;
        comment.likes = 0;
        comment.dislikes = 0;

        this.articleService.addArticleComment(comment).subscribe(result => {
            this.router.navigate(['/article/'+this.id+"/comments"])
        }, error => console.error(error));
    }
    
   
}

