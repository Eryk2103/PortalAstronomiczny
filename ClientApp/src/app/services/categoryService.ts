import { HttpClient, HttpParams } from "@angular/common/http";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Inject, Injectable } from "@angular/core";
import { MatGridTileHeaderCssMatStyler, PageEvent } from "@angular/material";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthorizeService } from "src/api-authorization/authorize.service";
import { Category } from "../model/category";
import { MessageDto } from "../model/message-dto";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string)
    {
       
    }
    getCategories()
    {
        var url = this.baseUrl + "api/Category";
        return this.http.get<Category[]>(url);
    }
    AddCategory(category: Category)
    {
        var url = this.baseUrl + "api/Category";
        return this.http.post(url, category);
    }
}