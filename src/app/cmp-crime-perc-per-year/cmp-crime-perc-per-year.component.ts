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

    var sqlTop100 = `select OriginalArea.Crime_year,OriginalArea.area_Code, 
    OriginalArea.area_wise_Count*100/TotalAreaWise.year_wise_Count Percentage,
    ((OriginalArea.area_wise_Count - Status_Incomplete.Status_Incomplete_count) *100/OriginalArea.area_wise_Count) Status_COmplete_Percentage,
    (Female_Victims.Female_Victim_count * 100 / OriginalArea.area_wise_Count) Female_Victim_Percentage
    from 
    (select EXTRACT(year from date_occured) Crime_year , area_code, count(*) area_wise_Count 
    from crime where area_code = (select distinct(area_code) from area_details where name = '`+event+`') group by EXTRACT(year from date_occured),area_code) OriginalArea,

    (select EXTRACT(year from date_occured) Crime_year , count(*) year_wise_Count 
    from crime group by EXTRACT(year from date_occured)) TotalAreaWise,

    (select EXTRACT(year from date_occured) Crime_year, area_code, count(*) Status_Incomplete_count
    from crime where area_code = (select distinct(area_code) from area_details where name = '`+event+`') and status_code ='IC' group by EXTRACT(year from date_occured), area_code) Status_Incomplete,
    
    (select EXTRACT(year from date_occured) Crime_year, area_code, count(*) Female_Victim_count
     from crime where area_code = (select distinct(area_code) from area_details where name = '`+event+`') and victim_id in(select victim_id from victim_details where sex ='F')
     group by EXTRACT(year from date_occured), area_code) Female_Victims
      
    where OriginalArea.Crime_year = TotalAreaWise.Crime_year
    and OriginalArea.Crime_year = Status_Incomplete.Crime_year
    and OriginalArea.Crime_year = Female_Victims.Crime_year
    order by OriginalArea.Crime_year`;

    this.top100Service.getData(sqlTop100).subscribe(
    data=>{
      console.log(data);
      let labels = data.map(res => res['CRIME_YEAR']);
      let perc = data.map(res => res['PERCENTAGE']);
      let solved = data.map(res => res['STATUS_COMPLETE_PERCENTAGE']);
      let females = data.map(res => res['FEMALE_VICTIM_PERCENTAGE']);
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
            },
            { 
              data: females,
              label: 'Percentage of female victims across years in '+event,
              backgroundColor: color("#4B0082").alpha(0.5).rgbString(),
              borderColor: color("#4B0082").alpha(1).rgbString(),
              borderDash: [5, 5],
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
