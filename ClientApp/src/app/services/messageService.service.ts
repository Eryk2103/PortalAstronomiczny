import { HttpClient, HttpParams } from "@angular/common/http";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Inject, Injectable } from "@angular/core";
import { MatGridTileHeaderCssMatStyler, PageEvent } from "@angular/material";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthorizeService } from "src/api-authorization/authorize.service";
import { MessageDto } from "../model/message-dto";
@Injectable({
    providedIn: 'root'
})
export class MessageService {

    userName: string;
    role: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,public authorizeService: AuthorizeService)
    {
        authorizeService.getUser().subscribe(x=>{
            this.userName=x.name;
            
        });
    }
    getMessages(event: PageEvent)
    {
        var url = this.baseUrl+"api/Message";
        var params = new HttpParams()
                .set("userName", this.userName)
                .set("pageIndex", event.pageIndex.toString())
                .set("pageSize", event.pageSize.toString());

        return this.http.get<any>(url, {params})
    }
    postMessage(message: MessageDto)
    {
        var url = this.baseUrl+"api/Message";
        return this.http.post<MessageDto>(url, message)
    }

}