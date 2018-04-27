import { Component, OnInit } from '@angular/core';
import { SrvTop100Service } from '../srv-top100.service';

@Component({
  selector: 'app-cmp-calculate-probability',
  templateUrl: './cmp-calculate-probability.component.html',
  styleUrls: ['./cmp-calculate-probability.component.css']
})
export class CmpCalculateProbabilityComponent implements OnInit {

  descents=[
    {NAME:'A', VALUE: 'Other Asian '},
    {NAME:'B', VALUE: 'Black'},
    {NAME:'C', VALUE: 'Chinese'},
    {NAME:'D', VALUE: 'Cambodian'},
    {NAME:'F', VALUE: 'Filipino'},
    {NAME:'G', VALUE: 'Guamanian'},
    {NAME:'H', VALUE: 'Hispanic/Latin/Mexican '},
    {NAME:'I', VALUE: 'American Indian/Alaskan Native '},
    {NAME:'J', VALUE: 'Japanese'},
    {NAME:'K', VALUE: 'Korean'},
    {NAME:'L', VALUE: 'Laotian'},
    {NAME:'O', VALUE: 'Other'},
    {NAME:'P', VALUE: 'Pacific Islander '},
    {NAME:'S', VALUE: 'Samoan'},
    {NAME:'U', VALUE: 'Hawaiian'},
    {NAME:'V', VALUE: 'Vietnamese'},
    {NAME:'W', VALUE: 'White'},
    {NAME:'X', VALUE: 'Unknown'},
    {NAME:'Z', VALUE: 'Asian Indian'}
  ];

  ages=[
    {NAME:'Elderly'},
    {NAME:'Millenials'},
    {NAME:'Children'},
    {NAME:'Middle Age'},
    {NAME:'Teens'}
  ];

  genders=[
    {NAME:'M', VALUE:'Male'},
    {NAME:'F', VALUE:'Female'},
    {NAME:'X', VALUE:'Unknown'}
  ];
  constructor(private top100Service: SrvTop100Service) {
  }

  ngOnInit() {
  }

  area="";
  selectedValueDescent: String;
  selectedValueAge: String; 
  selectedValueGender: String;

  areaSelected(event){
    this.area=event;
  }

  plotGraph(){
    var sqlGetYears = `select (ageVicitims.ac/total.c)*(sexVictims.sc/total.c)*(descentVictims.dc/total.c)*100 res
    from 
    (select count(victim_id) c from crime 
    where area_code in (select area_code from area_details where name='`+this.area+`')) total,
    (select count(*) sc
    from Victim_details vd, (select victim_id, x.c co from crime, (select count(victim_id) c from crime 
    where area_code in (select area_code from area_details where name='`+this.area+`')) x
    where area_code in (select area_code from area_details where name='`+this.area+`')) a
    where sex ='`+this.selectedValueGender+`' and vd.victim_id in (a.victim_id) group by sex) sexVictims,
    (select count(*) dc
    from Victim_details vd, (select victim_id, x.c co from crime, (select count(victim_id) c from crime 
    where area_code in (select area_code from area_details where name='`+this.area+`')) x
    where area_code in (select area_code from area_details where name='`+this.area+`')) a
    where descent_code ='`+this.selectedValueDescent+`' and vd.victim_id in (a.victim_id)group by descent_code) descentVictims,
    (select count(*) ac
    from Victim_details vd, (select victim_id, x.c co from crime, (select count(victim_id) c from crime 
    where area_code in (select area_code from area_details where name='`+this.area+`')) x
    where area_code in (select area_code from area_details where name='`+this.area+`')) a
    where vd.age_group ='`+this.selectedValueAge+`' and vd.victim_id in (a.victim_id) group by age_group) ageVicitims`;
    this.top100Service.getData(sqlGetYears).subscribe(
      data => {
        console.log(data);
        document.getElementById('probability').innerHTML=(data[0]['RES']*100/100)+"%";
      });
  }
}
