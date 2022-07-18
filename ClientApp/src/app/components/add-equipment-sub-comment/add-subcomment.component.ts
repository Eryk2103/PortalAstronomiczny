
import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { EquipmentComponent } from '../equipment/equipment.component';
import { EquipmentComment } from '../../model/equipment-comment';
import { Observable } from 'rxjs';
import { EquipmentService } from '../../services/equipmentService.service';


@Component({
    selector: 'app-add-subcomment',
    templateUrl: './add-subcomment.component.html',
    styleUrls: ['./add-subcomment.component.css']
})
export class AddEquipmentSubCommentComponent implements OnInit {
    id: number;
    commentId: number
    form: FormGroup;
    comment: EquipmentComment;
    userName: string;

    public isAuthenticated: Observable<boolean>;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,private router: Router, private activatedRoute: ActivatedRoute, private authorizeService: AuthorizeService,private equipmentService: EquipmentService)
        {
            authorizeService.getUser().subscribe(x=>{
                this.userName=x.name;
                
            });
        }
    ngOnInit() {
        this.form  = new FormGroup({
            content: new FormControl(''),
        });
        this.loadData();
        this.isAuthenticated = this.authorizeService.isAuthenticated();
        
    }
    loadData(){
        this.commentId = +this.activatedRoute.snapshot.paramMap.get('commentId');
        this.id = +this.activatedRoute.snapshot.paramMap.get('id');
        
    }
    onSubmit(){
        
        var comment = <EquipmentComment>{};
        comment.equipmentId = this.id;
        comment.userId = this.userName;
        comment.parentCommentId = this.commentId;
        comment.content = this.form.get("content").value;
        comment.likes = 0;
        comment.dislikes = 0;

        this.equipmentService.postEquipmentComment(comment)
        .subscribe(result => {
            this.router.navigate(['/equipment/'+this.id+"/comments"])
        }, error => console.error(error));
    }
    
   
}

