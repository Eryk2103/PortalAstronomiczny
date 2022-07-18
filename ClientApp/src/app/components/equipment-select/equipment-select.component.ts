import { T } from '@angular/cdk/keycodes';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category } from '../../model/category';
import { Equipment } from '../../model/equipment';
import { CategoryService } from '../../services/categoryService';
import { EquipmentService } from '../../services/equipmentService.service';

@Component({
  selector: 'app-equipment-select',
  templateUrl: './equipment-select.component.html',
  styleUrls: ['./equipment-select.component.css']
})
export class EquipmentSelectComponent implements OnInit {

  equipment: Equipment[];
  filteredEquipment: Equipment[];
  displayEquipment: boolean = false;
  selected = new FormControl('');

  @Output() selectedEquipment = new EventEmitter<Equipment>();

  constructor(private equipmentService: EquipmentService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    this.equipmentService.getAllEquipment().subscribe(res=>{
      this.equipment = res.data;
      console.log(res.data)
    })
  }
  changeCategory(category: Category){
    this.filteredEquipment = this.equipment.filter(e =>{ return e.categoryId == category.id})
    this.displayEquipment = true;
    console.log("change", category)
  }
  addEquipment()
  {
    this.selectedEquipment.emit(this.selected.value);
  }

}
