import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../../model/post';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { PostLikes } from '../../model/PostLikes';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../services/userService.service';
import { PostService } from '../../services/postService.service';
import { MatMenuTrigger } from '@angular/material';
import {MatSort} from '@angular/material/sort';
import { Equipment } from '../../model/equipment';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../services/stateService.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    obs: Observable<any>;
    role: Observable<string[]>;
    public posts: MatTableDataSource<Post>;
    public isAuthenticated: Observable<boolean>
    public likedPosts: PostLikes[];
    public email: string;
    public sortColumn: string = "DateAdded";
    public sortOrder: string = "DESC";
    filterColumn: string = "Title";
    filterQuery: string = null;
    equipmentFilter: string = null;
    state: any;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,private stateService: StateService, private authorizeService: AuthorizeService, private userService: UserService, private postService: PostService, private route: ActivatedRoute)
        {
            this.authorizeService.getUser().subscribe(x=> {
                if(x==null)
                    this.email=null;
                else
                    this.email=x.name
            });
            this.role = userService.getRole();
        }
    ngOnInit() {

        
        this.role.subscribe(
            res=>{
                sessionStorage.setItem('role', res[0]);
            }
        ),err=>console.error(err);
        var param = this.route.snapshot.paramMap.get('filter');
        if(param!= null){
            this.filterColumn = "CelestialBoddy";
            this.filterQuery = param;
        }
        this.loadData();
        this.getLikedPosts();
        this.isAuthenticated = this.authorizeService.isAuthenticated(); 
    }
    getLikedPosts()
    {
        this.postService.getLikedPosts()
        .subscribe(result => {
            this.likedPosts = result;
        }, error => console.error(error));
    }
    loadData(query: string=null)
    {
        var pageEvent = new PageEvent();
            pageEvent.pageIndex = 0;
            pageEvent.pageSize = 5;
        if(query)
        {
            this.filterQuery = query;
        }
        this.getData(pageEvent);
        
    }
    getData(event: PageEvent)
    {
        
        this.postService.getPosts(event, this.sortColumn, this.sortOrder,this.filterColumn, this.filterQuery, this.equipmentFilter)
            .subscribe(result => {
                console.log(result)
                this.paginator.length = result.totalCount;
                this.paginator.pageIndex = result.pageIndex;
                this.paginator.pageSize = result.pageSize;
                this.posts = new MatTableDataSource<Post>(result.data);
                this.obs = this.posts.connect();
            }, error => console.error(error));
        this.scrollToTop();
        
    }
    check(id: number)
    {
        var post = this.likedPosts.find(x=>x.postId==id);
        if(post==undefined)
        {
            return true;
        }
        return false;
    }
    
    like(post: Post){
    
        var postLike : PostLikes = {postId: post.id, userId: this.email};
        
        var likedPost = this.likedPosts.find(x=>x.postId==post.id);
       
        if(likedPost == undefined)
        {
            this.postService.postLikedPost(postLike).subscribe(res=>{
                this.getLikedPosts();
            },e=>console.error(e));
            post.likes++;
        }
        else{
            this.postService.deleteLikedPost(likedPost.id).subscribe(res=>{
                this.getLikedPosts();
            },e=>console.error(e));
            post.likes--;
        }
        this.postService.putPostWithoutEquipment(post).subscribe(res=>{

        },e=>console.error(e));
        
        
    }
    likesHL()
    {
        this.sortColumn="Likes";
        this.sortOrder="DESC";
        this.loadData();
    }
    dateAddedLH()
    {
        this.sortColumn="DateAdded";
        this.sortOrder="DESC";
        this.loadData();
    }
    filter(filterArray: Equipment[]){
        this.equipmentFilter = filterArray.map(e=>{return e.name}).toString();
        this.loadData(this.filterQuery);
        console.log(this.equipmentFilter);
    }
    scrollToTop() {
        window.scroll({ 
                top: 0, 
                left: 0, 
                behavior: 'smooth' 
         });
         console.log("scroll")
     }
     updateFilterService()
     {
        this.state.sortColumn = this.sortColumn;
        this.state.sortOrder = this.sortOrder;
        this.state.filterColumn = this.filterColumn ;
        this.state.filterQuery = this.filterQuery;
        this.state.equipmentFilter = this.equipmentFilter;
        this.stateService.state$.next(this.state);
     }
}

