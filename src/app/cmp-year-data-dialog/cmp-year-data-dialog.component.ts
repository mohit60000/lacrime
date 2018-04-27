import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SrvTop100Service } from '../srv-top100.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-cmp-year-data-dialog',
  templateUrl: './cmp-year-data-dialog.component.html',
  styleUrls: ['./cmp-year-data-dialog.component.css']
})
export class CmpYearDataDialog implements OnInit {

  private chart = [];

  constructor(private top100Service: SrvTop100Service, public dialogRef: MatDialogRef<CmpYearDataDialog>, @Inject(MAT_DIALOG_DATA) public yearSelected: string) { 
    var sqlTop100 = "select (select description from crime_details where crime_code=c.crime_codes) cd from crime c where EXTRACT(year from date_reported)="+yearSelected;
    var arrFinalCrimeCodes = [];
    var sortedCrimeCodes = [];
    var hashMap={};
    top100Service.getData(sqlTop100).subscribe(
      data=>{
        console.log(data);
        let labels=data.map(val => val['CRIME']);
        let values=data.map(val => val['COUNT']);
        console.log(labels);
        console.log(values);

        var color = Chart.helpers.color;
        this.chart = new Chart('dialogChart', {
          type: 'horizontalBar',
          data: {
            labels: labels,
            datasets: [
              { 
                data: values,
                label: 'Count of Top 10 crimes in '+yearSelected,
                backgroundColor: color("#FF3F80").alpha(0.5).rgbString(),
				        borderColor: color("#FF3F80").alpha(1).rgbString(),
				        borderWidth: 3,
              }
            ]
          },
          options: {
            responsive: true,
            legend: {
              position: 'top',
            }
          }
        });

      },
      (error)=>{
        console.log(error.error.message);
      }
    );
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close('Confirm');
  }

}
