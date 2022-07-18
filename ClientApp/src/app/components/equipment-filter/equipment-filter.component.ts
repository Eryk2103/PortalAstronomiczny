import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../../model/category';

@Component({
  selector: 'app-equipment-filter',
  templateUrl: './equipment-filter.component.html',
  styleUrls: ['./equipment-filter.component.css']
})
export class EquipmentFilterComponent implements OnInit {

  category: Category;
  @Output() queryEmit = new EventEmitter<string>();
  @Output() selectedCategory = new EventEmitter<Category>();
  constructor() { }

  ngOnInit() {
  }
  search(value: string){
    this.queryEmit.emit(value);
  }
  filter(){
    this.selectedCategory.emit(this.category)
  }
}
