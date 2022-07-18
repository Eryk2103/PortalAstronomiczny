import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import { Article } from '../../model/article';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Equipment } from '../../model/equipment';
import { Observable } from 'rxjs';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { ArticleService } from '../../services/articleService.service';
import { UserService } from '../../services/userService.service';

@Component({
    selector: 'app-add-article',
    templateUrl: './add-article.component.html',
    styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit 
{
    title: string;
    form: FormGroup;
    article: Article;
    id?: number;
    public response: {dbPath: ''};
    public isAuthenticated: Observable<boolean>;
    userName: string;
    role: Observable<string[]>;

    constructor(
        private http: HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        @Inject('BASE_URL') private baseUrl: string, private authorizeService: AuthorizeService, private userService: UserService, private articleService: ArticleService)
        {
            authorizeService.getUser().subscribe(x=>{
                this.userName=x.name;
                this.role = this.userService.getRole();
            });
        }

    ngOnInit() 
    {
       this.form = new FormGroup({
           title: new FormControl(''),
           content: new FormControl('')
       });
       this.loadData();
       this.isAuthenticated = this.authorizeService.isAuthenticated();
    }

    loadData()
    {
        this.id = +this.activatedRoute.snapshot.paramMap.get('id');
        
        if(this.id)
        {
            this.articleService.getArticle(this.id).subscribe(result => {
                this.article = result;
                this.title = "Edit - " + this.article.title;
                this.form.patchValue(this.article);
            
            }, error => console.error(error));
        }
        else{
            this.title = "Add article";
        }
    }

    onSubmit() 
    {
        var article = (this.id) ? this.article : <Article>{};
        article.title = this.form.get("title").value;
        article.content = this.form.get("content").value;
        article.published = true;
        if(this.id)
        {
            article.lastEdited = new Date();
            if(this.response.dbPath!= undefined)
                article.thumbnail = this.response.dbPath;
            this.articleService.putArticle(this.article.id, article)
                    .subscribe(result => {
                        this.router.navigate(['/articles'])
                    },error => console.error(error))
        }
        else{
            article.publishDate = new Date();
            article.lastEdited = new Date();
            article.thumbnail = this.response.dbPath;
            article.userId = this.userName;
            this.articleService.postArticle(article)
                    .subscribe(result => {
                        this.router.navigate(['/articles'])
                    },error => console.error(error))
        }
    
    }
    public uploadFinished = (event) => {
        this.response = event;
    }
}

