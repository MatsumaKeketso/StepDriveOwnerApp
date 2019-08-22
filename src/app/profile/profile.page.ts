import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  // reference to firebase firestore
  db = firebase.firestore();
  // reference to firebase storage for image uploads
  storage = firebase.storage().ref();
  // to store data from the form inputs
  businessdata = {
    ownername: '',
    businessname: '',
    image: '',
    email: '',
    description: '',
    cellnumber: '',
    cost: null
  }
  constructor() { }

  ngOnInit() {
  }
  addBusinessData() {
    
  }
}
