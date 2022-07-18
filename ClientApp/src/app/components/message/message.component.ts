import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';




@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string, public dialog: MatDialog)
        {

        }
    ngOnInit() {
        
    }
    openDialog()
    {
        this.dialog.open(MessageDialogComponent, {
            data: {
                animal: 'panda',
            },
        });
    }
    
}

