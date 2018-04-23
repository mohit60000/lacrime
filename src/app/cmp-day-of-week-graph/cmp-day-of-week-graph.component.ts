import { Component, OnInit } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-cmp-day-of-week-graph',
  templateUrl: './cmp-day-of-week-graph.component.html',
  styleUrls: ['./cmp-day-of-week-graph.component.css']
})
export class CmpDayOfWeekGraph implements OnInit {

  minStartDate = new Date(2010, 0, 1);
  maxStartDate = new Date(2017, 11, 30);
  minEndDate = new Date(2010, 0, 1);
  maxEndDate = new Date(2017, 11, 31);
  startDateVal = new Date(2010, 0, 1);
  endDateVal = new Date(2010, 0, 1);
  events = {};

  constructor() { }

  ngOnInit() {
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type=='startDate')
    {
      if(this.events['endDate']!=null)
      {
        if (event.value>this.events['endDate'])
        {
          this.minEndDate = event.value;
          this.endDateVal = event.value;
        }
      }
      else
      {
        this.minEndDate = event.value;
      }
    }
    this.events[type] = event.value;
  }

}
