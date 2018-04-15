import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator, MatSort, MatSortable, MatTableDataSource} from '@angular/material';
import { SrvTop100Service } from '../srv-top100.service';
import { DataSource } from '@angular/cdk/collections';
import { Top100 } from '../models/top100.model'
import { element } from 'protractor';

@Component({
  selector: 'app-cmp-top100-table',
  templateUrl: './cmp-top100-table.component.html',
  styleUrls: ['./cmp-top100-table.component.css']
})
export class CmpTop100Table implements OnInit {
  private tableData: Array<any>;
  private dataSource;

  ngOnInit() {
  }

  constructor(private top100Service: SrvTop100Service) {
    var sqlTop100 = "select * from (select * from crime order by date_occured desc) where rownum<=100";
    top100Service.getData(sqlTop100).subscribe(
      data=>{
        console.log(data);
        this.dataSource = new MatTableDataSource<Top100>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error)=>{
        console.log(error.error.message);
      }
    );
   }
  //data = new Top100DataSource(this.top100Service);
  

  //dataSource = new MatTableDataSource<Top100>(this.tableData);
  displayedColumns=['DR_NUMBER', 'DATE_REPORTED', 'DATE_OCCURED', 'TIME_OCCURED', 'CRIME_CODES', 'STATUS_CODE', 'VICTIM_ID', 'WEAPON_CODE', 'AREA_CODE', 'MO_CODES']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

}

