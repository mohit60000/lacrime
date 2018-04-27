import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator, MatSort, MatSortable, MatTableDataSource} from '@angular/material';
import { SrvTop100Service } from '../srv-top100.service';
import { DataSource } from '@angular/cdk/collections';
import { element } from 'protractor';
import { Top100 } from '../models/top100.model';
import { Chart } from 'chart.js';
import { forEach } from '@angular/router/src/utils/collection';
import { MouseEvent, MarkerManager } from '@agm/core';
import { } from '@types/googlemaps';
import { HttpClient } from '@angular/common/http';
import { } from '../../../markerclusterer';


@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})


export class GoogleMapsComponent implements OnInit {

  ofctypes = [];
  ofctimes = [];
  ofcyears = [];
  ofcweapons = [];
  ofcareas = [];

  typeofc: string;
  timeofc: string;
  yearofc: string;
  weaponofc: string;
  areaofc: string;

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  isTracking = false;

  currentLat: any;
  currentLong: any;

  marker: google.maps.Marker;

  constructor(private top100Service: SrvTop100Service) {
    var allweapons = "select DISTINCT(description) from WEAPON_DETAILS";
    top100Service.getData(allweapons).subscribe(
    data=>{
      console.log(data);
      this.ofcweapons = data;
    },
    (error)=>{
      console.log(error.error.message);
    });

    var allcrimes = "SELECT DISTINCT(description) from CRIME_DETAILS";
    top100Service.getData(allcrimes).subscribe(
      data=>{
        console.log(data);
        this.ofctypes = data;
      },
      (error)=>{
        console.log(error.error.message);
    });

    var allareas = "select DISTINCT(NAME) from area_details";
    top100Service.getData(allareas).subscribe(
      data=>{
        console.log(data);
        this.ofcareas = data;
      },
      (error)=>{
        console.log(error.error.message);
    });
  }

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(34.0522, -118.2437),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }


  nearMe() {
    var centerCircle;
    this.ngOnInit();
    var cityCircle = new google.maps.Circle();

    var marker = new google.maps.Marker({
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      position: this.map.getCenter(),
      map: this.map,
      draggable: true
    });;

    var infowindow = new google.maps.InfoWindow();
    var title;
    
    google.maps.event.addListener(marker, 'dragstart',function(event){
      cityCircle.setMap(null);
    });

    google.maps.event.addListener(marker, 'dragend', (function(event){
      cityCircle.setMap(null);
      title = marker.getPosition().toString();
      
      centerCircle = marker.getPosition();      
      cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.map,
        center: marker.getPosition(),
        radius: 12070
      });
      this.getDataForCircle(cityCircle, marker);
    }).bind(this));
  }
     
  getDataForCircle(c,m){
    this.ngOnInit();
    m.setMap(this.map);
    c.setMap(this.map);

    var x;
    var marker;
    var gc = `SELECT * FROM (SELECT * FROM (SELECT z.latitude, z.longitude, p.radius, p.distance_unit * rad2deg * (ACOS(COS(deg2rad * (p.latpoint)) * COS(deg2rad * (z.latitude))* COS(deg2rad * (p.longpoint - z.longitude)) + SIN(deg2rad * (p.latpoint)) * SIN(deg2rad * (z.latitude)))) AS distance FROM geocodeTest z JOIN (SELECT  34.0522 AS latpoint, -118.2437 AS longpoint, 15.0 AS radius, 111.045 AS distance_unit, 57.2957795 AS rad2deg, 0.0174532925 AS deg2rad FROM  DUAL) p ON 1=1 WHERE z.latitude BETWEEN p.latpoint  - (p.radius / p.distance_unit) AND p.latpoint  + (p.radius /p.distance_unit) AND z.longitude BETWEEN p.longpoint - (p.radius / (p.distance_unit * COS(deg2rad * (p.latpoint)))) AND p.longpoint + (p.radius / (p.distance_unit * COS(deg2rad * (p.latpoint))))) WHERE distance <= radius ORDER BY distance) WHERE ROWNUM <= 20`;
    this.top100Service.getData(gc).subscribe(
      data=>{
      console.log(data);
      x = data;
      x.forEach(element => {
        let latLng = {lat: Number(element['LATITUDE'])+((Math.random()/10)*((Math.random()*2)-1)), lng: Number(element['LONGITUDE']+((Math.random()/10)*((Math.random()*.2)-1)))};
        marker = new google.maps.Marker({
            position: latLng,
            title: String(element['LATITUDE']).concat(', ', String(element['LONGITUDE'])),
            map : this.map
          });
      },
        (error)=>{
          console.log(error.error.message);
      });
    });
  }

        
// The marker's position property needs an object like { lat: 0, lng: 0 };
// Number(location.latitude) is there to convert the string to a number, but if it's a number already, there's no need to cast it further.
// Set the position and title
// marker = new google.maps.Marker({
//   position: latLng,
//   title: String(element['LATITUDE']).concat(', ', String(element['LONGITUDE'])),
//   map : this.map
// });

// google.maps.event.addListener(marker, 'click', (function(marker) {
//   return function() {
//     infowindow.setContent(title);
//     infowindow.open(this.map, marker);
//   }
// })(marker));


  findMe() {
    this.ngOnInit();

    var crimeCoords = 'select * from (select latitude, longitude from area_details) where rownum<=100';
    this.top100Service.getData(crimeCoords).subscribe(
        data=>{
        console.log(data);
        this.showPosition(data);
      },
      (error)=>{
        console.log(error.error.message);
      }
    );
  }

  showPosition(position) {
    var marker, i;
    var markerList = [];

    var geocoder = new google.maps.Geocoder;

    var infowindow = new google.maps.InfoWindow();
    position.forEach(element => {
      // The marker's position property needs an object like { lat: 0, lng: 0 };
      // Number(location.latitude) is there to convert the string to a number, but if it's a number already, there's no need to cast it further.
      let latLng = {lat: Number(element['LATITUDE'])+((Math.random()/10)*((Math.random()*2)-1)), lng: Number(element['LONGITUDE']+((Math.random()/10)*((Math.random()*.2)-1)))};
      
      // Set the position and title
      marker = new google.maps.Marker({
        position: latLng,
        title: String(element['LATITUDE']).concat(', ', String(element['LONGITUDE'])),
       // map : this.map
      });
      
      markerList.push(marker);
      // place marker in map

      google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          var a;
          geocoder.geocode({'location': latLng}, function(results, status) {
            if (status.toString() === 'OK') {
              if (results[0]) {
                a = results[0].formatted_address.toString();
                console.log(a);
                infowindow.setContent(a);
                infowindow.open(this.map, marker);
              }
            }
          });
        }
      })(marker));      
    });

    var vx = new MarkerClusterer(this.map, markerList, {imagePath: 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclusterer/images/m'});
   }
}