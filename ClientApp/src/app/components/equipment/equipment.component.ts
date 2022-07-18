import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { Equipment } from '../../model/equipment';
import { EquipmentLike } from '../../model/equipment-likes';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { EquipmentService } from '../../services/equipmentService.service';
import { MatSort } from '@angular/material/sort';
import { Category } from '../../model/category';
import { UserService } from '../../services/userService.service';


@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

    
    public equipment: MatTableDataSource<Equipment>;
    public displayedColumns: string[] = ['name','likes','actions'];
    public likedEquipment: EquipmentLike[];
    public userName: string;
    public defaultSortColumn: string = "Likes";
    public defaultOrder: string ="desc";
    filterColumn: string = "name";
    query: string = null;
    categoryFilter: Category;
    role: Observable<string[]>;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false} ) sort: MatSort
    
    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string, private authorizeService: AuthorizeService, private equipmentService: EquipmentService,private userService: UserService)
        {
            this.authorizeService.getUser().subscribe(x=> {
                if(x == null)
                    this.userName =null
                else
                 this.userName=x.name}
                 
            )
            this.role = userService.getRole();
        }
    ngOnInit() {
        
        this.loadData();
        this.getLikedEq();

    }
    loadData(query: string=null)
    {
        var pageEvent = new PageEvent();
            pageEvent.pageIndex = 0;
            pageEvent.pageSize = 10;
        if(query){
            this.query = query;
        }
        this.getData(pageEvent);
    }
    getData(event: PageEvent)
    {
        this.equipmentService.getEquipment(event, (this.sort) ? this.sort.active: this.defaultSortColumn, (this.sort) ? this.sort.direction : this.defaultOrder, this.filterColumn, this.query)
            .subscribe(result => {
                this.paginator.length = result.totalCount;
                this.paginator.pageIndex = result.pageIndex;
                this.paginator.pageSize = result.pageSize;
                if(this.categoryFilter!=undefined)
                    this.equipment = new MatTableDataSource<Equipment>(result.data.filter(e=>e.categoryId==this.categoryFilter.id));
                else
                    this.equipment = new MatTableDataSource<Equipment>(result.data);

                console.log(result.data)
            }, error => console.error(error));
    }

    getLikedEq()
    {
        this.equipmentService.getEquipmentLikes()
        .subscribe(result => {
            this.likedEquipment = result;
        }, error => console.error(error));
        
    }
    check(id: number)
    {
        var post = this.likedEquipment.find(x=>x.equipmentId==id);
        if(post==undefined)
        {
            return true;
        }
        return false;
    }
    like(eq: Equipment){
    
        var eqLike : EquipmentLike = {equipmentId: eq.id, userId: this.userName};
        
        var likedPost = this.likedEquipment.find(x=>x.equipmentId==eq.id);
       
        if(likedPost == undefined)
        {
            this.equipmentService.postEquipmentLike(eqLike).subscribe(res=>{
                this.getLikedEq();
            },e=>console.error(e));
            eq.likes++;
        }
        else{
            this.equipmentService.deleteEquipmentLike(likedPost.id).subscribe(res=>{
                this.getLikedEq();
            },e=>console.error(e));
            eq.likes--;
        }
        this.equipmentService.putEquipment(eq).subscribe(res=>{

        },e=>console.error(e));
        
        
    }
    addEquipment(equipment: Equipment){
        this.loadData();
    }
    filterCategory(category: Category){
        this.categoryFilter = category;
        this.loadData();
    }
    
    
}

