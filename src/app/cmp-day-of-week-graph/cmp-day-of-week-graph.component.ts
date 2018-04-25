import { Component, OnInit } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { SrvTop100Service } from '../srv-top100.service';
import { MatPaginator, MatSort, MatSortable, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { Chart } from 'chart.js';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from 'protractor';

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
  private chart = [];
  private pieChart = [];

  constructor(private top100Service: SrvTop100Service, public dialog: MatDialog) { 
  }

  ngOnInit() {
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type=='startDate')
    {
      this.startDateVal = event.value;
      if(this.events['endDate']!=null)
      {
        if (event.value>this.events['endDate'])
        {
          this.minEndDate = event.value;
          this.endDateVal = event.value;
        }
        else{
          this.minEndDate = event.value;
        }
      }
      else
      {
        this.minEndDate = event.value;
        this.endDateVal = event.value;
      }
    }
    this.events[type] = event.value;
    if (type=='endDate')
    {
      this.endDateVal=event.value;
    }
  }

dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

  plotGraph()
  {
    if (this.chart instanceof Chart){
      this.chart.destroy();             //To stop flickering of Charts on selecting new data
    }
    if (this.pieChart instanceof Chart){
      this.pieChart.destroy();          //To stop flickering of Charts on selecting new data
    }
    let startDate = this.startDateVal.getDate()+"/"+(this.startDateVal.getMonth()+1)+"/"+this.startDateVal.getFullYear();
    let endDate = this.endDateVal.getDate()+"/"+(this.endDateVal.getMonth()+1)+"/"+this.endDateVal.getFullYear();
    console.log(startDate);
    var sqlGetYears = "select d day, (select description from crime_details where crime_code=cc) crime, ccc count \
    from (select d,cc,count(cc) ccc \
    from (select to_char(date_occured, 'DAY') as d, crime_codes cc \
    from crime_view \
    where date_occured between TO_DATE('"+startDate+"', 'DD/MM/YYYY') AND TO_DATE('"+endDate+"', 'DD/MM/YYYY')) \
    group by (d, cc))";
    this.top100Service.getData(sqlGetYears).subscribe(
      data=>{
        console.log(data);
        let days=[], crimes=[], finalLabel=[];
        let allDataMap={};
        let crimeToCountMap={};
        let crimeToColorMap={};
        for(var ind in data){
          if (days.indexOf(data[ind].DAY.trim())==-1){
            days.push(data[ind].DAY.trim());
            allDataMap[data[ind].DAY.trim()]=[];
          }
        }
        for(var ind in data){
          if (data[ind].CRIME!=null){
            allDataMap[data[ind].DAY.trim()].push([data[ind].CRIME,data[ind].COUNT]);
          }
        }

        for (var ind in allDataMap){
          allDataMap[ind].sort(function(a, b) {
            return b[1] - a[1];
          });
        }
        console.log(allDataMap);
        let finalDataset=[]
        for (var ind in allDataMap)
        {
          finalLabel.push(ind);
          allDataMap[ind] = allDataMap[ind].slice(0,10);
          for (var i in allDataMap[ind])
          {
            if (crimes.indexOf(allDataMap[ind][i][0])==-1)
            {
              crimes.push(allDataMap[ind][i][0]);
            }
          }
        }
        crimes.forEach(element => {
          let crimeCount=[]
          for (var ind in allDataMap)
          {
            let flag=false;
            for (var i in allDataMap[ind])
            {
              if (allDataMap[ind][i][0]==element)
              {
                flag=true;
                crimeCount.push(allDataMap[ind][i][1]);
                if (element in crimeToCountMap){
                  crimeToCountMap[element]+=allDataMap[ind][i][1];
                }
                else{
                  crimeToCountMap[element]=allDataMap[ind][i][1];
                }
                break;
              }
            }
            if (flag==false)
            {
              crimeCount.push(0);
            }
          }
          let tempMap={};
          let tempColor = this.dynamicColors();
          crimeToColorMap[element]=tempColor;
          tempMap['label']=element;
          tempMap['backgroundColor']=tempColor;
          tempMap['data']=crimeCount;
          finalDataset.push(tempMap);
        });
        console.log(finalLabel);
        this.chart = new Chart('canvas', {
          type: 'horizontalBar',
          data: {
            labels: finalLabel,
            datasets: finalDataset
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
            }
          }
        });
        

        let pieChartLabels = [];
        let pieChartData = [];
        let bgColor = [];
        for (var key in crimeToCountMap){
          pieChartLabels.push(key);
          pieChartData.push(crimeToCountMap[key]);
          bgColor.push(crimeToColorMap[key]);
        }

        this.pieChart = new Chart('pieGraph', {
          type: 'pie',
          data: {
            labels: pieChartLabels,
            datasets: [
              { 
                data: pieChartData,
                backgroundColor: bgColor
              }
            ]
          },
          options: {
            responsive: true,
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'CRIME SUMMARY IN SELECTED TIME'
            },
            animateRotate: true
          }
        });
        document.getElementsByClassName('legend')[0].innerHTML="";
        for (var ind in pieChartLabels){
          document.getElementsByClassName('legend')[0].innerHTML+=`<li style="float: left; margin-right: 10px;"><span style="background-color:`+bgColor[ind]+`; width: 10px; height: 10px; display: inline-block; margin-right: 10px;border-radius: 10px;"></span>`+pieChartLabels[ind]+`</li>`;
        }
        document.getElementById('container').style.display="block";
      },
      (error)=>{
        console.log(error.error.message);
      });
  }

}
