
import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { EquipmentComment } from '../../model/equipment-comment';
import { EquipmentService } from '../../services/equipmentService.service';
import { AuthorizeService } from 'src/api-authorization/authorize.service';


@Component({
    selector: 'app-add-equipment-comment',
    templateUrl: './add-equipment-comment.component.html',
    styleUrls: ['./add-equipment-comment.component.css']
})
export class AddEquipmentCommentComponent implements OnInit {
    id: number;
    form: FormGroup;
    comment: EquipmentComment;
    userName: string;
    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,private router: Router, private activatedRoute: ActivatedRoute,private equipmentService: EquipmentService,private authorizeService: AuthorizeService)
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
    }
    loadData(){
        this.id = +this.activatedRoute.snapshot.paramMap.get('id');
        
    }
    onSubmit(){
        
        var comment = <EquipmentComment>{};
        comment.equipmentId = this.id;
        comment.userId = this.userName;
        comment.parentCommentId = null;
        comment.commentDate = new Date();
        comment.content = this.form.get("content").value;
        comment.likes = 0;
        comment.dislikes = 0;

        this.equipmentService.postEquipmentComment(comment).subscribe(result => {
            this.router.navigate(['/equipment/'+this.id+"/detail"])
        }, error => console.error(error));
    }
    
   
}

