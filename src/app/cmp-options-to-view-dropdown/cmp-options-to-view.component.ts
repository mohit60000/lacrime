import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';
import { SrvTop100Service } from '../srv-top100.service';

@Component({
  selector: 'app-cmp-options-to-view',
  templateUrl: './cmp-options-to-view.component.html',
  styleUrls: ['./cmp-options-to-view.component.css']
})
export class CmpOptionsToViewDropdown implements OnInit {

  options=[
    {NAME:'Top 10 Crime Codes', VALUE:'CC'},
    {NAME:'Top 10 MOs', VALUE:'MO'}
  ];
  selectedValue: string;

  constructor() { }

  ngOnInit() {
  }

  @Output()
  selected = new EventEmitter<string>();

  optionSelected()
  {
    this.selected.emit(this.selectedValue);
  }

}
