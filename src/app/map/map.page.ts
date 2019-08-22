import { Component, OnInit, ViewChild, AfterContentInit, asNativeElements } from '@angular/core';
declare var google;
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
   // CSS properties ****************

  //  referring to the div showing the map
  @ViewChild('map', {static: true}) showMap;
  map;
  infoWindow = new google.maps.InfoWindow;
  
  SOUTH_AFRICAN_BOUNDS = {
    north: -21.914461,
    south: -35.800139,
    west: 15.905430,
    east: 34.899504
  }
  persons = [
  ]
  constructor() { }

  ngOnInit() {  
    this.initMap()
  }
  initMap(){
    const coords = new google.maps.LatLng(26.2485,27.8540);
    // map options
    const mapOptions: google.maps.MapOptions = {
      center: coords,
      disableDefaultUI: true, // disable a set of controls that display by default
      minZoom: 10, // limit to how much you can zoom out
      maxZoom: 17, // limit to how much you zoom in
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      restriction: {
        latLngBounds: this.SOUTH_AFRICAN_BOUNDS,
        strictBounds: false
      }
    }
    // new map
    this.showMap = new google.maps.Map(this.showMap.nativeElement, mapOptions);
    
        // disable map controls 

    // get the device geo location or handle any errors
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res => {
        
        const position = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
        
        this.infoWindow.setPosition(position);
        this.infoWindow.setContent('Your Location');
        this.infoWindow.open(this.showMap);
      }, err => {
        this.handleLoacationError('Geolocation service failed', this.showMap.center())
      })
    } else {
      this.handleLoacationError('No geolocation available', this.showMap.center());
    }
    // loop through markers
    this.persons.forEach(element => {
      this.addMarker(element);
    });
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
      // set custom icon
     let infoWindow = new google.maps.InfoWindow({
       content: props.content
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
}
