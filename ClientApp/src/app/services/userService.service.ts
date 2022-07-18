import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { MatGridTileHeaderCssMatStyler } from "@angular/material";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthorizeService } from "src/api-authorization/authorize.service";
import { UserRole } from "../model/user-role";
@Injectable({
    providedIn: 'root'
})
export class UserService {

    userName: string;
    role: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,public authorizeService: AuthorizeService)
    {
        this.authorizeService.getUser().subscribe(x=> {
            if(x == null)
                this.userName =null
            else
             this.userName=x.name
             
            }

             
        )
    }
    getRole(): Observable<string[]>{
        if(this.userName == null)
            return of(["Guest"])
        var url = this.baseUrl+"api/User";
        var params = new HttpParams().set("name", this.userName);
        
        return this.http.get<string[]>(url, {params})
    }
    changeRoleToRedactor(name: string)
    {
        var url = this.baseUrl+"api/User";
        
        var params = new HttpParams()
            .set("name", name)
            .set("role", "Redactor");
        return this.http.post<string>(url, {params});
    }
    ChangeRoleToRegisteredUser(name: string)
    {
        var url = this.baseUrl+"api/User";
        var params = new HttpParams()
            .set("name", name)
            .set("role", "RegisteredUser");

        return this.http.post<string>(url, {params})
    }
    ChangeRole(newUserRole: UserRole)
    {
        var url = this.baseUrl+"api/User";
        return this.http.post<string>(url, newUserRole)
    }
    
}