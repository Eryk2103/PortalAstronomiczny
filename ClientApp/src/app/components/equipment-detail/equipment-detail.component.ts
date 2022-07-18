import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { Equipment } from '../../model/equipment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { EquipmentComment } from '../../model/equipment-comment';
import { EquipmentService } from '../../services/equipmentService.service';



@Component({
    selector: 'app-equipment-detail',
    templateUrl: './equipment-detail.component.html',
    styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {

    email: string;
    id: number;
    public comments: EquipmentComment[];
    isAuthenticated: Observable<boolean>;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,private router: Router, private activatedRoute: ActivatedRoute, private authorizeService: AuthorizeService, private equipmentService: EquipmentService)
        {
            this.isAuthenticated=this.authorizeService.isAuthenticated();
        }
    ngOnInit(): void {
        this.id = +this.activatedRoute.snapshot.paramMap.get('id');
        this.equipmentService.getEquipmentComments(this.id)
        .subscribe(result => {
            this.comments = result;
            this.comments.map(c=>c.parentCommentName=this.getUserNameOfComment(c.id));
        },error => console.error(error));
        
    }
    addComment(){
        this.router.navigate(['/equipment/'+this.id+"/AddComment"])
    }
    getUserNameOfComment(id: number)
    {
        var comment = this.comments.find(c=>c.id==id)
        return comment.user.userName;
    }
}

