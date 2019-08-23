import { Component, OnInit, ViewChild, AfterContentInit, asNativeElements } from '@angular/core';
import * as firebase from 'firebase';
declare var google;
// declare var axios;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  // CSS properties ****************
  booking = {
    active: false,
    inactive: true
  }
  person = {
    default: true,
    expand: false
  }
  more = false;
   // CSS properties ****************

  //  referring to the div showing the map
  @ViewChild('map', {static: true}) showMap;
  db = firebase.firestore();
  map;
  infoWindow = new google.maps.InfoWindow;
  // restriction for the map
  SOUTH_AFRICAN_BOUNDS = {
    north: -21.914461,
    south: -35.800139,
    west: 15.905430,
    east: 34.899504
  }
  users = []
  mapCenter = {
    lat: 0,
    lng: 0
  }
  constructor() { }

  ngOnInit() {
    this.getusers();
    this.getLocation();
  }
  setlocation(coords) {
    console.log(coords);
    
    this.mapCenter = coords;
  }
  getLocation(){
    // map options
    // get the device geo location or handle any errors
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res => {
        
        this.mapCenter = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
        const marker = {
          coords: {
            lat: res.coords.latitude,
          lng: res.coords.longitude
          },
          content: 'You',
          name: ''
        }
        
        this.infoWindow.setPosition(this.mapCenter);
        this.infoWindow.setContent('Me');
        this.infoWindow.open(this.showMap);
        this.initMap();
        this.addMarker(marker);
      }, err => {
        this.handleLoacationError('Geolocation service failed', this.showMap.center())
      })
    } else {
      this.handleLoacationError('No geolocation available', this.showMap.center());
    }
  }
  mapOptions() {
    
    const mapOptions: google.maps.MapOptions = {
      center: this.mapCenter,
      disableDefaultUI: true, // disable a set of controls that display by default
      minZoom: 10, // limit to how much you can zoom out
      maxZoom: 17, // limit to how much you zoom in
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      restriction: {
        latLngBounds: this.SOUTH_AFRICAN_BOUNDS,
        strictBounds: false
      }
    }
    return mapOptions;
  }
  initMap(){
    // new map
    this.showMap = new google.maps.Map(this.showMap.nativeElement, this.mapOptions());
  }

  // add marker function 
  addMarker(props) {
    // add marker
    const marker = new google.maps.Marker({
      position: props.coords,
      map: this.showMap,
    })
    // check for custom icon
    if(props.iconImage) {
      // set custom icon
      marker.setIcon(props.iconImage)
    }

    // check for content
    if(props.content) {
      // set custom content
     let infoWindow = new google.maps.InfoWindow({
       content: `<h5 style="margin:0;padding:0;">${props.name} </h5>`+props.content
     });
     marker.addListener('click', () => {
      infoWindow.open(this.showMap, marker);
     })
    }
  }
  handleLoacationError (content, position) {
    this.infoWindow.setOptions(position);
    this.infoWindow.setContent(content);
    this.infoWindow.open(this.showMap)
  }
  togglePanel(){
    
    this.booking = {
      active: true,
      inactive: !this.booking.inactive
    }
  }
  showMore(){
    this.more = !this.more;
  }
  getusers(){
    this.db.collection('users').get().then(snapshot => {
      snapshot.forEach(doc => {
        this.users.push(doc.data());
        this.addMarker(doc.data());
      })
    })
  }
}
