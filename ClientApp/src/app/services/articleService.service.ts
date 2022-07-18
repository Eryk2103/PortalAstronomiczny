import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { MatGridTileHeaderCssMatStyler, PageEvent } from "@angular/material";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthorizeService } from "src/api-authorization/authorize.service";
import { ArticleComment } from "../model/article-comment";
import { Article } from "../model/article";
@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string)
    {
        
    }
    getData(event: PageEvent): Observable<any>
    {
        var url = this.baseUrl + 'api/Article'
        var params = new HttpParams()
            .set("pageIndex", event.pageIndex.toString())
            .set("pageSize", event.pageSize.toString())
        return this.http.get<any>(url, {params});
    }
    getArticle(id: number)
    {
        var url = this.baseUrl + "api/Article/"+id;
        return this.http.get<Article>(url);
    }

    postArticle(article: Article)
    {
        var url = this.baseUrl + "api/Article";
        return this.http.post<Article>(url,article)
    }
    putArticle(id: number, article: Article)
    {
        var url = this.baseUrl + "api/Article/" + id;
            return this.http.put<Article>(url,article)
    }
    getArticleComments(id: number)
    {
        var url = this.baseUrl + "api/ArticleComment/"+ id;
        return this.http.get<ArticleComment[]>(url)
    }
    addArticleComment(comment: ArticleComment)
    {
        var url = this.baseUrl + "api/ArticleComment";
        return this.http.post<ArticleComment>(url, comment);
    }
    addArticleSubComment(comment: ArticleComment)
    {
        var url = this.baseUrl + "api/ArticleComment";
        return this.http.post<ArticleComment>(url, comment);
    }
    deleteArticle(id: number)
    {
        var url = this.baseUrl + "api/Article/"+id;
        return this.http.delete<Article>(url);
    }
    deleteArticleComment(id: number)
    {
        var url = this.baseUrl + "api/ArticleComment/"+id;
        return this.http.delete<ArticleComment>(url);
    }
}