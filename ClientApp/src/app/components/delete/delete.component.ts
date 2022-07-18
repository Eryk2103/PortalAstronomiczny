import {Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { EquipmentService } from '../../services/equipmentService.service';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../services/userService.service';
import { ArticleService } from '../../services/articleService.service';
import { PostService } from '../../services/postService.service';
import { Article } from '../../model/article';
import { Post } from '../../model/post';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class Delete implements OnInit {

    userName: string;
    role: Observable<string[]>;
    @Input() objTypeToDelete : string;
    @Input() id: number;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string, private authorizeService: AuthorizeService,private userService: UserService, private articleService: ArticleService, private equipmentService: EquipmentService, private postService: PostService)
        {
            this.authorizeService.getUser().subscribe(x=> {
                if(x == null)
                    this.userName =null
                else
                 this.userName=x.name}
            );
            this.role = userService.getRole();
        }
    ngOnInit() {
      
        this.role.subscribe(r=>{console.log(r)})
    }
    delete()
    {
        if(this.objTypeToDelete =="Post")
        {
            this.postService.deletePost(this.id).subscribe(res=>{},e=>console.error(e));
        }
        else if(this.objTypeToDelete == "PostComment")
        {
            this.postService.deletePostComment(this.id).subscribe(res=>{},e=>console.error(e));
        }
        else if(this.objTypeToDelete == "Article")
        {
             this.articleService.deleteArticle(this.id).subscribe(res=>{},e=>console.error(e));
        }
        else if(this.objTypeToDelete == "ArticelComment")
        {
            this.articleService.deleteArticleComment(this.id).subscribe(res=>{},e=>console.error(e));
        }
        else if(this.objTypeToDelete == "Equipment")
        {
            this.equipmentService.deleteEquipment(this.id).subscribe(res=>{},e=>console.error(e));
        }
        else if(this.objTypeToDelete == "EquipmentComment")
        {
            this.equipmentService.deleteEquipmentComment(this.id).subscribe(res=>{},e=>console.error(e));
        }
        window.location.reload();
    }
    
}

