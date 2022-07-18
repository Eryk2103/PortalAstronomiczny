import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { UserService } from '../../services/userService.service';
import { UserRole } from '../../model/user-role';





@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    
    form: FormGroup;
    form2: FormGroup;
    message: string
    userName: string;
    role: Observable<string[]>;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,private authorizeService: AuthorizeService, private userService: UserService)
        {
            this.authorizeService.getUser().subscribe(x=> {
                if(x == null)
                    this.userName =null
                else
                 this.userName=x.name
                }
            )
        }
    ngOnInit() {
        this.form = new FormGroup({
            userName : new FormControl('')
        });
        this.form2 = new FormGroup({
            userName2 : new FormControl('')
        });
    }
    changeToRedactor()
    {
        var name = this.form.get('userName').value;
        var user = <UserRole>{userName: name, roleName: "Redactor" }
        
        console.log(name);
        
        this.userService.ChangeRole(user)
            .subscribe(res=>{
                this.message=res;
            },
                e => console.error(e))
    }
    changeToRegisteredUser()
    {
        var name = this.form2.get('userName2').value;
        var user = <UserRole>{userName: name, roleName: "RegisteredUser" }
        
        console.log(name);
        this.userService.ChangeRole(user)
            .subscribe(res=>{
                this.message=res;
            },
                e => console.error(e))
    }
   
}

