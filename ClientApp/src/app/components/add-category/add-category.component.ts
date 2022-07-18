import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/categoryService';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(''),
    parentCategory: new FormControl('')
  });
  mainCategories: Category[]=[];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res=>{
      this.mainCategories = res.filter(c=>c.parentCategoryId==null)
    })
  }
  add(){
    var categoryParent = parseInt(this.form.get('parentCategory').value);
    var categoryName = this.form.get('name').value;
    var category = <Category>{id:0, name: categoryName, parentCategoryId: categoryParent };
    this.categoryService.AddCategory(category).subscribe(res=>{});
    this.form.reset();
  }
}
