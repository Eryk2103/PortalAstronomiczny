import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../services/categoryService';
import { Category } from '../../model/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  subCategories: Category[];
  mainCategories: Category[];
  categories: Category[];

  initialCategoryValue="Category";
  initialSubCategoryValue="Sub category";

  @Output() selectedCategory = new EventEmitter<Category>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    this.categoryService.getCategories().subscribe(res=>{
      this.categories= res;
    })
  }
  changeCategory(category: Category){
    this.subCategories = this.categories.filter(c=>c.parentCategoryId==category.id);
    this.selectedCategory.emit(category);
  }
  emit(category: Category){
    this.selectedCategory.emit(category);
  }
  clear(){
    this.initialSubCategoryValue="Sub Category";
    this.selectedCategory.emit(undefined);
  }
}
