import { Component, OnInit } from '@angular/core';
import { SrvTop100Service } from '../srv-top100.service';
import { MatPaginator, MatSort, MatSortable, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { Chart } from 'chart.js';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from 'protractor';

@Component({
  selector: 'app-five-year-extrapolation',
  templateUrl: './five-year-extrapolation.component.html',
  styleUrls: ['./five-year-extrapolation.component.css']
})
export class FiveYearExtrapolationComponent implements OnInit {

  private chart;
  private pieChart;

  constructor(private top100Service: SrvTop100Service, public dialog: MatDialog) { }

  ngOnInit() {

    var sqlGetYears = `(select EXTRACT(year from date_occured) years, count(*) Estimated_Victim_count 
    from crime group by EXTRACT(year from date_occured))
    UNION 
    (SELECT ((select max(EXTRACT(year from crime.date_occured)) from crime) + level) years, 
    cast((power(Growth_in_Victims.GR + 1, level))* lastYear.last_year_count as int) Estimated_Victim_count
    FROM dual, (select sum(growth_rate) GR from 
    (select year2.yearNum given_year, year1.cc prev_year_count, year2.cc this_year_count, ((year1.cc - year2.cc)/ year1.cc) growth_rate
    from (select EXTRACT(year from date_occured) yearNum,  count(*) cc from crime
    group by EXTRACT(year from date_occured))year1,
    (select EXTRACT(year from date_occured) yearNum,  count(*) cc from crime
    group by EXTRACT(year from date_occured))year2
    where year1.yearNum = year2.yearNum - 1 
    order by year1.yearNum)) Growth_in_Victims , 
    (select count(*) last_year_count from crime 
    where EXTRACT(year from date_occured) = (select max(EXTRACT(year from crime.date_occured)) from crime)
    group by EXTRACT(year from date_occured)) lastYear
    CONNECT BY LEVEL <= 5)`;

    this.top100Service.getData(sqlGetYears).subscribe(
      data => {
        var finalLabel = data.map(res => res['YEARS']);
        var finalDataset = data.map(res => res['ESTIMATED_VICTIM_COUNT']);
        console.log(data);

        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: finalLabel,
            datasets: [
              {
              data: finalDataset,
              label: 'Projected Crime in next 5 years',
              backgroundColor: ["grey","grey","grey","grey","grey","grey","grey","grey",this.dynamicColors(),this.dynamicColors(),this.dynamicColors(),this.dynamicColors(),this.dynamicColors()] 
            }]
          },
          options: {
            responsive: true,
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                stacked: true,
              }],
              yAxes: [{
                stacked: true
              }]
            },
            title:{
              display: true,
              text: 'Projected Crime in next 5 years'
            }
          }
        });
      });
  }

  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }


}