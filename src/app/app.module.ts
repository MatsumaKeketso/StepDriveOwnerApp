import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
<<<<<<< HEAD
// import { IonicSwipeAllModule } from "ionic-swipe-all";
import { MapPage } from './map/map.page';
import { FIREBASE_CONFIG } from '../environments/firebase_config';
import * as firebase from 'firebase'
import { HttpClientModule } from "@angular/common/http";
// import { Camera, CameraOptions } from '@ionic-native/camera';
import { Camera } from '@ionic-native/Camera/ngx';



=======
import { IonicSwipeAllModule } from "ionic-swipe-all";
// import { MapPage } from './map/map.page';
import { FIREBASE_CONFIG } from '../environments/firebase_config';
import * as firebase from 'firebase'
import { HttpClientModule } from "@angular/common/http";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx'
>>>>>>> f326a0c9042ac8b3b7a3dddbd344e921b11ec50c

firebase.initializeApp(FIREBASE_CONFIG);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    NativeGeocoder
  ],
  bootstrap: [AppComponent]
})


export class AppModule {}
