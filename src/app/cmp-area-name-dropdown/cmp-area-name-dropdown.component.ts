import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';
import { SrvTop100Service } from '../srv-top100.service';

@Component({
  selector: 'app-cmp-area-name-dropdown',
  templateUrl: './cmp-area-name-dropdown.component.html',
  styleUrls: ['./cmp-area-name-dropdown.component.css']
})

export class CmpAreaNameDropdown implements OnInit {

  areas=[];
  selectedValue: string;

  constructor(private top100Service: SrvTop100Service) {
    var sqlTop100 = "select distinct name from area_details";
    top100Service.getData(sqlTop100).subscribe(
    data=>{
      console.log(data);
      this.areas=data;
    },
    (error)=>{
      console.log(error.error.message);
    }
  );
 }

 @Output()
  selected = new EventEmitter<string>();

  areaSelected()
  {
    this.selected.emit(this.selectedValue);
  }

  ngOnInit() {
  }


}
