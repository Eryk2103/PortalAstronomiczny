import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { calendar } from '../../model/calendar';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent} from '@angular/material';
import {MatChipInputEvent} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';



@Component({
    selector: 'app-add-calendar',
    templateUrl: './add-calendar.component.html',
    styleUrls: ['./add-calendar.component.css']
})
export class AddCalendarComponent implements OnInit {

  
    form: FormGroup;
    eventDate: Date;
    tags: string[] = [];

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,private router: Router, private activatedRoute: ActivatedRoute, private authorizeService: AuthorizeService)
        {

        }
    ngOnInit(): void {
        this.form = new FormGroup({
            content: new FormControl(''),
            date: new FormControl(''),
            tags: new FormControl('')
        });
        
    }
    addEvent(event: MatDatepickerInputEvent<Date>){
        this.eventDate = event.value;
    }

    onSubmit(){
        var url = this.baseUrl+"api/Calendar";
        var calendar = <calendar>{}
        calendar.content = this.form.get('content').value;
        calendar.date = this.form.get('date').value;
        calendar.tags = this.tags.toString();

        this.http.post<calendar>(url,calendar).subscribe(res=>{
            this.router.navigate(['/calendar/'])
        },err=>console.error(err)
        );


    }
    addTag(){
        var tag = this.form.get('tags').value;
        this.tags.push(tag);
        
    }
    remove(tag: string){
        const index = this.tags.indexOf(tag);

        if (index >= 0) {
            this.tags.splice(index, 1);
        }
    }
    
    
}

