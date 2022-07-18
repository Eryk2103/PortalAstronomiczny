import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { MatGridTileHeaderCssMatStyler } from "@angular/material";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthorizeService } from "src/api-authorization/authorize.service";
import { UserRole } from "../model/user-role";
import { PostsComponent } from "../components/posts/posts.component";
@Injectable({
    providedIn: 'root'
})
export class StateService {

   state$ = new BehaviorSubject<PostsComponent>(null);

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string)
    {
       
    }
   
}