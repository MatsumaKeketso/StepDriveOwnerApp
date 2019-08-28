import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { IonicSwipeAllModule } from "ionic-swipe-all";
import { MapPage } from './map/map.page';
import { FIREBASE_CONFIG } from '../environments/firebase_config';
import * as firebase from 'firebase'
import { HttpClientModule } from "@angular/common/http";
// import { Camera, CameraOptions } from '@ionic-native/camera';
import { Camera } from '@ionic-native/Camera/ngx';




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
    
  ],
  bootstrap: [AppComponent]
})


export class AppModule {}
