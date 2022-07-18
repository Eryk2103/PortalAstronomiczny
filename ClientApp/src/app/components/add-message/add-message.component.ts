import {Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageDto } from '../../model/message-dto';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { MessageService } from '../../services/messageService.service';




@Component({
    selector: 'app-add-message',
    templateUrl: './add-message.component.html',
    styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {

    form: FormGroup;
    userName: string;
    @Output() closeAddView = new EventEmitter<boolean>();
    
    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,private authorizeService: AuthorizeService, private messageService: MessageService)
        {   
            authorizeService.getUser().subscribe(x=>{
                this.userName=x.name;
                
            });
        }
    ngOnInit() {
        this.form = new FormGroup({
            recieverUserName: new FormControl(""),
            message: new FormControl("")
        });


        
    }
    onSubmit()
    {
        var message = <MessageDto>{}

        message.recieverUserName = this.form.get("recieverUserName").value;
        message.senderUserName = this.userName;
        message.message = this.form.get("message").value;
        message.date = new Date();

        this.messageService.postMessage(message)
        .subscribe(
            res=> {}
        , e=>console.error(e));
        this.closeAddView.emit(true);
    }
    close()
    {
        this.closeAddView.emit(true);
    }
    
}

