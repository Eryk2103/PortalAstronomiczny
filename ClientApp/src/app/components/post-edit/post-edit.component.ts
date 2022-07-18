import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import { Post } from '../../model/post';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Equipment } from '../../model/equipment';
import { PostService } from '../../services/postService.service';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.component.html',
    styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit 
{
    title: string;
    form: FormGroup;
    post: Post;
    id?: number;
    equipmentArray: Equipment[] = [];
    
    public response: {dbPath: ''};
    userName: string;;

    constructor(
        private http: HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        @Inject('BASE_URL') private baseUrl: string, private postService: PostService, private authorizeService: AuthorizeService)
        {
            authorizeService.getUser().subscribe(x=>{
                this.userName=x.name;
                
            });
        }

    ngOnInit() 
    {
       this.form = new FormGroup({
           title: new FormControl(''),
           content: new FormControl(''),
           celestialBoddy: new FormControl(''),
           equipment: new FormControl('')
       });
       this.loadData();
      
    }
    loadData()
    {

        this.id = +this.activatedRoute.snapshot.paramMap.get('id');
        
        if(this.id)
        {
            
            this.postService.getPost(this.id).subscribe(result => {
                this.post = result;
                this.title = "Edit - " + this.post.title;
                this.form.patchValue(this.post);
    
            }, error => console.error(error));
            this.postService.getPost(this.id).subscribe(res=>{
                this.equipmentArray = res.equipment;
            })
        }
        else{
            this.title = "Add post";
        }



        
    }
    onSubmit() 
    {
        var post = (this.id) ? this.post : <Post>{};

        post.title = this.form.get("title").value;
        post.content = this.form.get("content").value;
        post.celestialBoddy = this.form.get("celestialBoddy").value;
        post.dateAdded = new Date();
        post.equipment = this.equipmentArray;

        if(this.id)
        {
            post.photo = this.response.dbPath;
            this.postService.putPost(post)
                    .subscribe(result => {
                        this.router.navigate(['/posts'])
                    },error => console.error(error))
        }
        else{
            if(this.response.dbPath != undefined)
            post.photo = this.response.dbPath;
            
            post.userId = this.userName;
            this.postService.postPost(post)
                    .subscribe(result => {
                        this.router.navigate(['/posts'])
                    },error => console.error(error))
        }
        
            
        
    }
    public uploadFinished = (event) => {
        this.response = event;
    }
    addEquipment(equipment: Equipment){
        this.equipmentArray.push(equipment);
    }
    deleteEquipment(equipment: Equipment){
        console.log(equipment)
        console.log(this.equipmentArray)
        this.equipmentArray.splice(this.equipmentArray.indexOf(equipment), 1);
        console.log(this.equipmentArray)
    }
}

