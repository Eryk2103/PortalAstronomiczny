import {Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Message } from '../../model/message';
import { MessageService } from '../../services/messageService.service';
import { AuthorizeService } from 'src/api-authorization/authorize.service';




@Component({
    selector: 'app-message-dialog',
    templateUrl: './message-dialog.component.html',
    styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {

    userName: string;
    messages: MatTableDataSource<Message>;
    addMessageToggle: boolean;
    obs: Observable<any>;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string, @Inject(MAT_DIALOG_DATA) public data: string, private messageService: MessageService,private authorizeService: AuthorizeService)
        {
            authorizeService.getUser().subscribe(x=>{
                this.userName=x.name;
                
            });
        }
    ngOnInit() {
        
        var pageEvent = new PageEvent();
            pageEvent.pageIndex = 0;
            pageEvent.pageSize = 5;
            this.loadData(pageEvent);
    }
    loadData(event: PageEvent)
    {
        this.messageService.getMessages(event)
        .subscribe(
            res=>{
                    this.paginator.length = res.totalCount;
                    this.paginator.pageIndex = res.pageIndex;
                    this.paginator.pageSize = res.pageSize;
                    this.messages = new MatTableDataSource<Message>(res.data);
                    this.obs = this.messages.connect();
                    console.log(res)
            }, e=> console.error(e)
        );
    }
    addMessage()
    {
        this.addMessageToggle = true;
    }
    close(closeAdd : boolean)
    {
        if(closeAdd)
                this.addMessageToggle = false;
    }
    
}

