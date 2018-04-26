import { Component, OnInit } from '@angular/core';
import { SrvTop100Service } from '../srv-top100.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-cmp-area-wise-info',
  templateUrl: './cmp-area-wise-info.component.html',
  styleUrls: ['./cmp-area-wise-info.component.css']
})
export class CmpAreaWiseInfo implements OnInit {

  private chart;
  private areaNameSelected;
  status='loading';
  value = 50;
  color = 'accent';
  mode = 'indeterminate';
  area="";
  option="";

  constructor(private top100Service: SrvTop100Service) {
 }

  ngOnInit() {
  }

  areaSelected(event){
    this.area=event;
  }

  optionSelected(event){
    this.option=event;
  }

  plotGraph(){
    let sqlTop100="";
    let label="";
    if (this.option=="CC"){
      sqlTop100 = `select (select description from crime_details where crime_code=crime_codes) as name, ccc as count
      from (select crime_codes, count(distinct dr_number) ccc from crime_view
      where area_code=(select distinct area_code from area_details where name = '`+this.area+`')
      group by crime_codes
      order by ccc desc)
      where rownum<=10`;
      label = 'Count of Top 10 Crime Codes in '+this.area;
    }
    else if(this.option=="MO"){
      sqlTop100=`select (select description from mo_details where mo_codes=mc) as name, ccc as count
      from (select mo_codes mc, count(distinct dr_number) ccc from crime_view
      where area_code=(select distinct area_code from area_details where name = '`+this.area+`')
      group by mo_codes
      order by ccc desc)
      where rownum<=10`;
      label = 'Count of Top 10 MOs in '+this.area;
    }
      document.getElementById('container').style.display="none";
      document.getElementById('progressSpinner').style.display="block";
      if (this.chart instanceof Chart) {
        this.chart.destroy();             //To stop flickering of Charts on selecting new data
      }
      this.top100Service.getData(sqlTop100).subscribe(
      data=>{
        console.log(data);
        let labels = data.map(res => res['NAME']);
        let values = data.map(res => res['COUNT']);
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
                label: label,
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
