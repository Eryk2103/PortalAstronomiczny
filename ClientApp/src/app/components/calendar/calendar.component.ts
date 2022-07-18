import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { calendar } from '../../model/calendar';
import { UserService } from '../../services/userService.service';





@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  
    calendars: calendar[];
    userName: string;
    role: Observable<string[]>
    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,private router: Router, private activatedRoute: ActivatedRoute, private authorizeService: AuthorizeService, private userService: UserService)
        {
            this.authorizeService.getUser().subscribe(x=> {
                if(x == null)
                    this.userName =null
                else
                 this.userName=x.name}
            )
        }
    ngOnInit(): void {
        
        this.loadData();
        this.role= this.userService.getRole();
    }
    loadData(){
        var url = this.baseUrl+"api/Calendar";
        this.http.get<calendar[]>(url).subscribe(res => {
            this.calendars=res;
        }, error=> console.error(error));
        
        
        

    }
    arr(tags: string)
    {
        if(tags != null)
            return tags.split(',');
        return [];
    }
    /*
    loadNotifications()
    {
        if(this.userName!=undefined)
        {
            var params = new HttpParams().set("userName", this.userName);
            var url2 = this.baseUrl+"api/Notifications";

            this.http.get<CalendarNotification[]>(url2, {params}).subscribe(res => {
                this.notifications=res;
                console.log(res);
                console.log(this.userName);
            }, error=> console.error(error));
        }
        
    }
    subscribe(item: calendar)
    {
        var url = this.baseUrl+"api/Notifications";
        var notification= <CalendarNotificationDto>{}
            
        notification.calendar = item;
        notification.userName = this.userName;
        
        this.http.post<CalendarNotificationDto>(this.baseUrl+"api/Notifications", notification).subscribe(res=>{
            
        }, e => console.error(e));
        this.loadNotifications()
        
    }
    unsubscribe(item: calendar)
    {
        var url = this.baseUrl+"api/Notifications/"+this.getNotificationId(item);
        
        this.http.delete(url).subscribe(res=>{
        }, e => console.error(e));
        this.loadNotifications()

    }
    check(item: calendar): boolean
    {   
        if(this.notifications.filter(x=>x.calendarId==item.id).length>0)
        {
            return true;
        }
        else{
              return false;
        }
    }
    getNotificationId(item: calendar): number
    {
       return this.notifications.filter(x=>x.calendarId==item.id)[0].id;
    }*/
}

