import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { Article } from '../../model/article';
import { UserService } from '../../services/userService.service';
import { AuthorizeService, IUser } from 'src/api-authorization/authorize.service';
import { ArticleService } from '../../services/articleService.service';



@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    
    obs: Observable<any>;
    public articles: MatTableDataSource<Article>;
    role: Observable<string[]>;
    userName: string
    isAuthenticated: Observable<boolean>;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string, private userService: UserService, private authorizeService: AuthorizeService, private articleService: ArticleService)
        {
            this.authorizeService.getUser().subscribe(x=> {
                if(x == null)
                    this.userName =null
                else
                 this.userName=x.name}
            )
            this.role = userService.getRole();
        }
        
    ngOnInit() {
        
         var pageEvent = new PageEvent();
            pageEvent.pageIndex = 0;
            pageEvent.pageSize = 5;
        this.loadData(pageEvent);
        this.isAuthenticated = this.authorizeService.isAuthenticated();
        
    }
    loadData(event: PageEvent)
    {
        this.articleService.getData(event)
            .subscribe(result => {
                this.paginator.length = result.totalCount;
                this.paginator.pageIndex = result.pageIndex;
                this.paginator.pageSize = result.pageSize;
                this.articles = new MatTableDataSource<Article>(result.data);
                this.obs = this.articles.connect();
            }, error => console.error(error));
    }
    
}

