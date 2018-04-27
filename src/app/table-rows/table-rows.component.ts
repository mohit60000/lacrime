import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Top100 } from '../models/top100.model';
import { SrvTop100Service } from '../srv-top100.service';

@Component({
  selector: 'app-table-rows',
  templateUrl: './table-rows.component.html',
  styleUrls: ['./table-rows.component.css']
})
export class TableRowsComponent implements OnInit {

  adrr:string;
  cr:string;
  cdr:string;
  ddr:string;
  ldr:string;
  modr:string;
  pr:string;
  rsr:string;
  vdr:string;
  wdr:string;

  constructor(private top100Service: SrvTop100Service) { }

  ngOnInit() {
  }

  getRows(){
    var s1 = `select count(*) as c from AREA_DETAILS`;
    var s2 = `select count(*) as c from CRIME`;
    var s3 = `select count(*) as c from CRIME_DETAILS`;
    var s4 = `select count(*) as c from DESCENT_DETAILS`;
    var s5 = `select count(*) as c from LOCATION_DETAILS`;
    var s6 = `select count(*) as c from MO_DETAILS`;
    var s7 = `select count(*) as c from PREMISE_DETAILS`;
    var s8 = `select count(*) as c from REPORT_STATUS`;
    var s9 = `select count(*) as c from VICTIM_DETAILS`;
    var s10 = `select count(*) as c from WEAPON_DETAILS`;


    this.top100Service.getData(s1).subscribe(
      data=>{
        console.log(data);
        document.getElementById('adrr').value = data[0][`C`];
    });

    this.top100Service.getData(s2).subscribe(
      data=>{
        console.log(data);
        document.getElementById('cr').value = data[0][`C`];
    });

    this.top100Service.getData(s3).subscribe(
      data=>{
        console.log(data);
        document.getElementById('cdr').value = data[0][`C`];
    });

    this.top100Service.getData(s4).subscribe(
      data=>{
        console.log(data);
        document.getElementById('ddr').value = data[0][`C`];
    });

    this.top100Service.getData(s5).subscribe(
      data=>{
        console.log(data);
        document.getElementById('ldr').value = data[0][`C`];
    });

    this.top100Service.getData(s6).subscribe(
      data=>{
        console.log(data);
        document.getElementById('mdr').value = data[0][`C`];
    });

    this.top100Service.getData(s7).subscribe(
      data=>{
        console.log(data);
        document.getElementById('pr').value = data[0][`C`];
    });

    this.top100Service.getData(s8).subscribe(
      data=>{
        console.log(data);
        document.getElementById('rsr').value = data[0][`C`];
    });

    this.top100Service.getData(s9).subscribe(
      data=>{
        console.log(data);
        document.getElementById('vdr').value = data[0][`C`];
    });

    this.top100Service.getData(s10).subscribe(
      data=>{
        console.log(data);
        document.getElementById('wdr').value = data[0][`C`];
    });

  }
}
