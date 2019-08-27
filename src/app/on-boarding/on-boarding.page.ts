import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit {

  @ViewChild('mySlider', {static: false}) slides: IonSlides;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  swipeNext(){
    this.slides.slideNext();
  }
  goToLogin() {
    this.router.navigate(['login']);
  }
  goToRegister(){
    this.router.navigate(['register']);
  }
}
