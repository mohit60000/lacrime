import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator, MatSort, MatSortable, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { SrvTop100Service } from '../srv-top100.service';
import { DataSource } from '@angular/cdk/collections';
import { element } from 'protractor';
import { yearWise } from 'src/app/models/yearWise.model';
import { Top100 } from '../models/top100.model';
import { Chart } from 'chart.js';
import { forEach } from '@angular/router/src/utils/collection';
import { CmpYearDataDialog } from '../cmp-year-data-dialog/cmp-year-data-dialog.component';

@Component({
  selector: 'app-cmp-year-wise-crime',
  templateUrl: './cmp-year-wise-crime.component.html',
  styleUrls: ['./cmp-year-wise-crime.component.css']
})
export class CmpYearWiseCrime implements OnInit {

  private tableData: Array<any>;
  private dataSource;
  private chart = [];

  ngOnInit() {
  }

  constructor(private top100Service: SrvTop100Service, public dialog: MatDialog) {
    var sqlGetYears = "select count(dr_number) as case_count, y as year \
    from (select dr_number, EXTRACT(year from date_reported) as y from crime) \
    group by y \
    order by y desc";
    top100Service.getData(sqlGetYears).subscribe(
      data=>{
        console.log(data);
        //this.dataSource = new MatTableDataSource<yearWise>(data);
        var count = data.map(res => res.CASE_COUNT);
        var year = data.map(res => res.YEAR);
        var dynamicColors = function() {
          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);
          return "rgb(" + r + "," + g + "," + b + ")";
       };
       var bgColor = []

       for( var i in count){
        bgColor.push(dynamicColors());
       }

        this.chart = new Chart('canvas', {
          type: 'pie',
          data: {
            labels: year,
            datasets: [
              { 
                data: count,
                backgroundColor: bgColor
              }
            ]
          },
          options: {
            responsive: true,
            onClick: function(evt, elements) {
              var datasetIndex;
              var dataset;
              
              if (elements.length) {
                var index = elements[0]._index;
                datasetIndex = elements[0]._datasetIndex;
        
                dataset = this.chart.data.datasets[datasetIndex];
                const dialogConfig = new MatDialogConfig();

                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = true;
                dialogConfig.width = "1000px";
                dialogConfig.data = 2017-index;

                dialog.open(CmpYearDataDialog, dialogConfig);
              } 
              this.chart.update();
            }
          }
        });
      },
      (error)=>{
        console.log(error.error.message);
      }
    );
   }
  ngAfterViewInit() {
  }

}