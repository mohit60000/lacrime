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

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})

export class GoogleMapsComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  isTracking = false;

  currentLat: any;
  currentLong: any;

  marker: google.maps.Marker;

  constructor(private top100Service: SrvTop100Service) {}

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(34.0522, -118.2437),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

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
    var infowindow = new google.maps.InfoWindow();
    position.forEach(element => {
      // The marker's position property needs an object like { lat: 0, lng: 0 };
      // Number(location.latitude) is there to convert the string to a number, but if it's a number already, there's no need to cast it further.
      let latLng = {lat: Number(element['LATITUDE'])+((Math.random()/10)*((Math.random()*2)-1)), lng: Number(element['LONGITUDE']+((Math.random()/10)*((Math.random()*.2)-1)))};
  
      // Set the position and title
      marker = new google.maps.Marker({
        position: latLng,
        title: String(element['LATITUDE']).concat(', ', String(element['LONGITUDE'])),
//        map : this.map
      });
      
      markerList.push(marker);
      // place marker in map

      google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          infowindow.setContent(marker.title);
          infowindow.open(this.map, marker);
        }
      })(marker));      
    });

    //var mc = new MarkerClusterer(this.map, markerList,
    //  {imagePath: 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclusterer/images/m'});
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showTrackingPosition(position) {
    console.log('tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}');
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }
}