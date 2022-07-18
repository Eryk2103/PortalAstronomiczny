import { I } from "@angular/cdk/keycodes";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { MatGridTileHeaderCssMatStyler, PageEvent } from "@angular/material";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthorizeService } from "src/api-authorization/authorize.service";
import { Equipment } from "../model/equipment";
import { EquipmentComment } from "../model/equipment-comment";
import { EquipmentLike } from "../model/equipment-likes";
@Injectable({
    providedIn: 'root'
})
export class EquipmentService {

    userName: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,public authorizeService: AuthorizeService)
    {
        this.authorizeService.getUser().subscribe(x=> {
            if(x == null)
                this.userName =null
            else
             this.userName=x.name}
        )
    }
    getEquipment(event: PageEvent, sortColumn: string, sortOrder: string, filterColumn: string, filterQuery: string)
    {
        var url = this.baseUrl + 'api/Equipment'
        var params = new HttpParams()
                .set("pageIndex", event.pageIndex.toString())
                .set("pageSize", event.pageSize.toString())
                .set("sortColumn", sortColumn)
                .set("sortOrder", sortOrder)

        
        
        if(filterQuery && filterColumn)
        {
            params = params
                .set("filterColumn", filterColumn)
                .set("filterQuery",filterQuery);
        }
        return this.http.get<any>(url, {params})
    }
    getAllEquipment(){
        var url = this.baseUrl + 'api/Equipment'
        return this.http.get<any>(url)
    }
    getEquipmentById(id: number)
    {
        var url = this.baseUrl + "api/Equipment/"+id;
        return this.http.get<Equipment>(url)
    }
    putEquipment(item: Equipment)
    {
        var url = this.baseUrl + "api/Equipment/"+item.id;
        return this.http.put<Equipment>(url,item)
    }
    getEquipmentLikes() : Observable<EquipmentLike[]>
    {
        if(this.userName == null)
            return of();
        var url = this.baseUrl + 'api/EquipmentLikes'
        var params = new HttpParams().set("name", this.userName);
        return this.http.get<EquipmentLike[]>(url,{params})
    }
    deleteEquipmentLike(id: number)
    {
        var url = this.baseUrl + "api/EquipmentLikes";
        return this.http.delete<EquipmentLike>(url+'/'+id)
    }
    postEquipmentLike(item: EquipmentLike)
    {
        var url = this.baseUrl + "api/EquipmentLikes";
        return this.http.post<EquipmentLike>(url, item)
    }
    getEquipmentComments(id: number)
    {
        var url = this.baseUrl + "api/EquipmentComment/"+ id;
        return this.http.get<EquipmentComment[]>(url)
    }
    postEquipmentComment(comment: EquipmentComment)
    {
        var url = this.baseUrl + "api/EquipmentComment";
        return this.http.post<EquipmentComment>(url, comment)
    }
    postEquipment(equipment: Equipment)
    {
        var url = this.baseUrl + "api/Equipment";
        return this.http.post<Equipment>(url, equipment);
    }
    deleteEquipment(id: number)
    {
        var url = this.baseUrl + "api/Equipment/"+id;
        return this.http.delete<Equipment>(url);
    }
    deleteEquipmentComment(id: number)
    {
        var url = this.baseUrl + "api/EquipmentComment/"+id;
        return this.http.delete<EquipmentComment>(url);
    }
    
    
}