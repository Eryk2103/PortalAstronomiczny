import {Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { Equipment } from '../../model/equipment';
import { FormControl, FormGroup } from '@angular/forms';
import { EquipmentService } from '../../services/equipmentService.service';
import { EventEmitter } from '@angular/core';
import { Category } from '../../model/category';



@Component({
    selector: 'app-add-equipment',
    templateUrl: './add-equipment.component.html',
    styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {

    form = new FormGroup({
        name: new FormControl(''),
        specification: new FormControl('')
    });
    successMsg: boolean = false;
    errorMsg: boolean = false;
    category: Category;

    @Output() equipment = new EventEmitter<Equipment>();

    constructor(private equipmentervice: EquipmentService){}
    ngOnInit() {
        
    }

    onSubmit(){
        var eq = <Equipment>{};

        eq.name = this.form.get('name').value;
        eq.specification = this.form.get('specification').value;
        eq.categoryId = this.category.id;
        //eq.category = this.category;
        console.log(eq);
        this.equipmentervice.postEquipment(eq).subscribe(res=>{
            this.successMsg = true;
            this.equipment.emit(eq);
            console.log(res)
            setTimeout(() => {
                this.successMsg = false;
           }, 3000)
        },e=>{
            this.errorMsg=true
            setTimeout(() => {
                this.errorMsg = false;
           }, 3000)
        });
        this.form.reset();
        
    }
    
}

