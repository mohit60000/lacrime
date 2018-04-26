import { Component, OnInit } from '@angular/core';
import { SrvTop100Service } from '../srv-top100.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-cmp-crime-perc-per-year',
  templateUrl: './cmp-crime-perc-per-year.component.html',
  styleUrls: ['./cmp-crime-perc-per-year.component.css']
})
export class CmpCrimePercPerYear implements OnInit {

  private chart;
  status='loading';
  value = 50;
  color = 'accent';
  mode = 'indeterminate';

  constructor(private top100Service: SrvTop100Service) {}

  ngOnInit() {
  }

  areaSelected(event){
    document.getElementById('container').style.display="none";
    document.getElementById('progressSpinner').style.display="block";
    if (this.chart instanceof Chart) {
      this.chart.destroy();             //To stop flickering of Charts on selecting new data
    }
    var sqlTop100 = `select (select description from crime_details where crime_code=crime_codes) as crime, ccc as count
    from (select crime_codes, count(distinct dr_number) ccc from crime_view
    where area_code=(select distinct area_code from area_details where name = '`+event+`')
    group by crime_codes
    order by ccc desc)
    where rownum<=10`;
    this.top100Service.getData(sqlTop100).subscribe(
    data=>{
      console.log(data);
      data=[
        {YEAR: 2010, PERC: 71, SOLVED: 78},
        {YEAR: 2011, PERC: 67, SOLVED: 75},
        {YEAR: 2012, PERC: 65, SOLVED: 80},
        {YEAR: 2013, PERC: 53, SOLVED: 87},
        {YEAR: 2014, PERC: 42, SOLVED: 90},
        {YEAR: 2015, PERC: 34, SOLVED: 93},
        {YEAR: 2016, PERC: 22, SOLVED: 95},
        {YEAR: 2017, PERC: 20, SOLVED: 94}
      ];
      let labels = data.map(res => res['YEAR']);
      let perc = data.map(res => res['PERC']);
      let solved = data.map(res => res['SOLVED']);
      var color = Chart.helpers.color;
      this.chart = new Chart('dialogChart', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            { 
              data: perc,
              label: 'Percentage of crime across years in '+event,
              backgroundColor: color("#FF3F80").alpha(0.5).rgbString(),
              borderColor: color("#FF3F80").alpha(1).rgbString(),
              borderWidth: 3,
              fill: true
            },
            { 
              data: solved,
              label: 'Percentage of solved crime across years in '+event,
              backgroundColor: color("#00FF00").alpha(0.5).rgbString(),
              borderColor: color("#00FF00").alpha(1).rgbString(),
              borderWidth: 3,
              fill: false
            }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Years'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Percentage'
              }
            }]
          }
        }
      });
      this.status='done';
      document.getElementById('progressSpinner').style.display="none";
      document.getElementById('container').style.display="block";
    },
    (error)=>{
      console.log(error.error.message);
    }
  );
  }

}
