import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatGridTileHeaderCssMatStyler } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from '../../model/equipment';
import { Post } from '../../model/post';
import { EquipmentService } from '../../services/equipmentService.service';
import { PostService } from '../../services/postService.service';
import { StateService } from '../../services/stateService.service';

@Component({
  selector: 'app-post-filter',
  templateUrl: './post-filter.component.html',
  styleUrls: ['./post-filter.component.css']
})
export class PostFilterComponent implements OnInit {

  @Output() equipmentToFilter = new EventEmitter<Equipment[]>();
  @Output() columnNameEmit = new EventEmitter<string>();
  @Output() queryEmit = new EventEmitter<string>();
  equipment: Equipment[] = [];
  columnName: string = "Title";
  state: any;

  form = new FormGroup({
    queryForm: new FormControl(''),
  });

  constructor(private equipmentService: EquipmentService, private postService: PostService, private route: ActivatedRoute, private stateService: StateService) { }
  

  ngOnInit() {
    this.state = this.stateService.state$.getValue() || {};
    if(this.stateService.state$.getValue()!=null)
    {
      this.equipment = this.state.equipment;
      this.columnName = this.state.columnName;
      this.form.setValue({queryForm: this.state.query})
    }
    this.filter();
  }
  addEquipment(equipment: Equipment){
    this.equipment.push(equipment);
  }
  filter(){
    this.equipmentToFilter.emit(this.equipment);
    this.columnNameEmit.emit(this.columnName);
    this.queryEmit.emit(this.form.get('queryForm').value);
    
    this.updateState();
    console.log("query",this.form.get('queryForm').value)
  }
  remove(eq: Equipment){
    const index = this.equipment.indexOf(eq);

    if (index >= 0) {
      this.equipment.splice(index, 1);
    }
  }
  updateState()
  {
    this.state.equipment = this.equipment;
    this.state.columnName = this.columnName;
    this.state.query = this.form.get('queryForm').value;
    this.stateService.state$.next(this.state);
  }
}
