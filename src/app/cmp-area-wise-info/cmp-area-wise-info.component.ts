import { Component, OnInit } from '@angular/core';
import { SrvTop100Service } from '../srv-top100.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-cmp-area-wise-info',
  templateUrl: './cmp-area-wise-info.component.html',
  styleUrls: ['./cmp-area-wise-info.component.css']
})
export class CmpAreaWiseInfo implements OnInit {

  private chartCC; 
  private chartMO;
  private chartWC;
  private chart;
  private areaNameSelected;
  status='loading';
  value = 50;
  colorcc = 'warn';
  colormo = 'warn';
  colorwc = 'warn';
  colorpc = 'warn';
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

  plotGraph(opt){
    let sqlTop100="";
    let label="";
    let canvasID="";
    let pg="";
    let container="";
    let gColor="";
    if (opt=="CC"){
      sqlTop100 = `select (select description from crime_details where crime_code=crime_codes) as name, ccc as count
      from (select crime_codes, count(distinct dr_number) ccc from crime_view
      where area_code=(select distinct area_code from area_details where name = '`+this.area+`')
      group by crime_codes
      order by ccc desc)
      where rownum<=10`;
      label = 'Count of Top 10 Crime Codes in '+this.area;
      canvasID = 'dialogChartCC';
      pg = 'progressSpinnerCC';
      container = 'containerCC';
      gColor = '#FF3F80';
    }
    else if(opt=="MO"){
      sqlTop100=`select (select description from mo_details where mo_codes=mc) as name, ccc as count
      from (select mo_codes mc, count(distinct dr_number) ccc from crime_view
      where area_code=(select distinct area_code from area_details where name = '`+this.area+`')
      group by mo_codes
      order by ccc desc)
      where rownum<=10`;
      label = 'Count of Top 10 MOs in '+this.area;
      canvasID = 'dialogChartMO';
      pg = 'progressSpinnerMO';
      container = 'containerMO';
      gColor = '#009688';
    }
    else if(opt=="WC"){
      sqlTop100=` select (select description from weapon_Details where weapon_code=wc) as name, ccc as count
      from (select WEAPON_CODE wc, count(distinct dr_number) ccc from crime_view
      where area_code=(select distinct area_code from area_details where name = 'Central')
      and weapon_code is not null
      group by WEAPON_CODE
      order by ccc desc)
      where rownum<=10`;
      label = 'Count of Top 10 Weapons in '+this.area;
      canvasID = 'dialogChartWC';
      pg = 'progressSpinnerWC';
      container = 'containerWC';
      gColor = '#00BCD4';
    }
    else if(opt=="PC"){
      sqlTop100=`select (select description from premise_details where premise_code=pc) name, count
      from (select premise_code pc, count(area_code) count
      from area_details
      where area_code=(select distinct area_code from area_details where name = 'Central')
      group by premise_code)
      where rownum<=10
      order by count desc`;
      label = 'Count of Top 10 Premises of Crime in '+this.area;
      canvasID = 'dialogChartPC';
      pg = 'progressSpinnerPC';
      container = 'containerPC';
      gColor = '#800080';
    }
      document.getElementById(container).style.display="none";
      document.getElementById(pg).style.display="block";
      if (this.chart instanceof Chart) {
        this.chart.destroy();             //To stop flickering of Charts on selecting new data
      }
      this.top100Service.getData(sqlTop100).subscribe(
      data=>{
        console.log(data);
        let labels = data.map(res => {
          if(res['NAME']!=null){
            if (res['NAME'].toString().length>40)
            {
              return res['NAME'].substr(0,37)+"...";
            }
            else
            {
              return res['NAME'];
            }
          }
          else{
            return null;
          }
        });
        let values = data.map(res => res['COUNT']);
        console.log(labels);
        console.log(values);
        var color = Chart.helpers.color;
        this.chart = new Chart(canvasID, {
          type: 'horizontalBar',
          data: {
            labels: labels,
            datasets: [
              { 
                data: values,
                label: label,
                backgroundColor: color(gColor).alpha(0.5).rgbString(),
                borderColor: color(gColor).alpha(1).rgbString(),
                borderWidth: 3,
              }
            ]
          },
          options: {
            responsive: true,
            legend: {
              position: 'top',
              itemStyle: {
                width: 5 // or whatever, auto-wrap
              },
            }
          },
          scales: {
            yAxes: [{
                ticks: {
                    fontSize: 3
                }
            }]
        }
        });
        this.status='done';
        document.getElementById(pg).style.display="none";
        document.getElementById(container).style.display="block";
      },
      (error)=>{
        console.log(error.error.message);
      }
    );
    if(opt=="CC"){
      this.chartCC=this.chart;
    }
    else if(opt=="MO"){
      this.chartMO=this.chart;
    }
    else if(opt=="WC"){
      this.chartWC=this.chart;
    }
  }
}
