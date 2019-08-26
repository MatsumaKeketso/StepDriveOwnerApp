import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AwaitingPage } from '../awaiting/awaiting.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  loginForm: FormGroup;
  
  users = {
    schoolname: '',
    registration: '',
    email: '',
    cellnumber: '',
    cost: '',
    desc: '',
    open: '',
    closed: '',
    allday: '',
   
  }


  db = firebase.firestore();
  storage = firebase.storage().ref();
  businessdata = {
    schoolname: '',
    registration: '',
    // image: '',
    email: '',
    cellnumber: '',
    cost: '',
    desc: '',
    address: '',
    open: '',
    closed: '',
    allday: '',
  }


  validation_messages = {
    'schoolname': [
      {type: 'required', message: 'Schoolname address is required.'},
      {type: 'pattern', message: 'Schoolname address is required'},
      {type: 'validEmail', message: 'Schoolname address is required.'},
    ],
    'registration': [
     {type: 'required', message: 'registration is required.'},
     {type: 'minlength', message: 'registration must be atleast 6 char or more.'},
     {type: 'maxlength', message: 'registration must be less than 8 char or less'},
   ],
   'email': [
    {type: 'required', message: 'email is required.'},
    {type: 'minlength', message: 'email is valid.'},
    {type: 'maxlength', message: 'email must be less than 8 char or less'},
  ],
  'cellnumber': [
    {type: 'required', message: 'cellnumber is required.'},
    {type: 'minlength', message: 'cellnumber must be atleast 10 char or more.'},
    {type: 'maxlength', message: 'cellnumber must be less than 10 char or less'},
  ],
  'cost': [
    {type: 'required', message: 'cost is required.'},
    {type: 'minlength', message: 'cost is required.'},
    {type: 'maxlength', message: 'cost is required.'},
  ],
  'address': [
    {type: 'required', message: 'address is required.'},
    {type: 'minlength', message: 'address is required.'},
    {type: 'maxlength', message: 'address is required.'},
  ],
  'open': [
    {type: 'required', message: 'Password is required.'},
    {type: 'minlength', message: 'password must be atleast 6 char or more.'},
    {type: 'maxlength', message: 'Password must be less than 8 char or less'},
  ],
  'closed': [
    {type: 'required', message: 'Password is required.'},
    {type: 'minlength', message: 'password must be atleast 6 char or more.'},
    {type: 'maxlength', message: 'Password must be less than 8 char or less'},
  ],
  'allday': [
    {type: 'required', message: 'Password is required.'},
    {type: 'minlength', message: 'password must be atleast 6 char or more.'},
    {type: 'maxlength', message: 'Password must be less than 8 char or less'},
  ]
  }
  
  // reference to firebase firestore

  // reference to firebase storage for image uploads

  // to store data from the form inputs
  // businessdata = {
  //   schoolname: '',
  //   registration: '',
  //   image: '',
  //   email: '',
  //   cellnumber: '',
  //   cost: '',
  //   desc: '',
  //   address: '',
  //   open: '',
  //   closed: '',
  //   allday: true
  // }
  profileForm: FormGroup
  constructor(public formBuilder: FormBuilder ,public forms: FormBuilder) {
    
    this.loginForm = this.forms.group({
      schoolname: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      registration: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      cellnumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      cost: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      desc: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      address: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      open: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      closed: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      allday: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
    })

    // this.profileForm = this.formBuilder.group({
    //   schoolname: new FormControl ('', Validators.compose([
    //     Validators.required,
    //   ])),
    // registration: new FormControl ('', Validators.compose([
    //   Validators.required,
    // ])),
    // image: new FormControl ('', Validators.compose([
    //   Validators.required,
    // ])),
    // email: new FormControl ('', Validators.compose([
    //   Validators.required,
    //   Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
    //   Validators.maxLength(50),
    //   Validators.minLength(6)
    // ])),
    // cellnumber: new FormControl ('', Validators.compose([
    //   Validators.required,
    // ])),
    // cost: new FormControl ('', Validators.compose([
    //   Validators.required,
    // ])),
    // desc: new FormControl ('', Validators.compose([
    //   Validators.required,
    // ])),
    // address: new FormControl ('', Validators.compose([
    //   Validators.required,
    // ])),
    // open: new FormControl ('2019-08-22T00:00:32.767+02:00', Validators.compose([
    //   Validators.required,
    // ])),
    // closed: new FormControl ('2019-08-22T00:00:32.767+02:00', Validators.compose([
    //   Validators.required,
    // ])),
    // allday: new FormControl ('true', Validators.compose([
    //   Validators.required,
    // ]))
    // })
  }

  ngOnInit() {
  }
await(){
  
}
  createAccount(){
  
        
        this.db.collection('businesses').doc(this.businessdata.schoolname).set(this.businessdata).then(res => {
          console.log('Profile created');
          
        }).catch(error => {
          console.log('Error');
        });
      }
    }
//   }


//   addBusinessData() {
//     console.log(this.profileForm.value);
//     this.db.collection('businesses').doc(this.profileForm.value.schoolname).set(this.profileForm.value).then(res => {
//       console.log('Success');
//     }).catch(err => {
//       console.log('Failed');
//     })
//   }
// }
