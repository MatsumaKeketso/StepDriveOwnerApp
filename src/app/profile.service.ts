import { Injectable} from '@angular/core'

interface profile{
 schoolname: string,
 registration: null,
 image: '',
 email: '',
 cellnumber: null,
 cost: '',
 desc: '',
 address: '',
 open: null,
 closed: null,
 allday: true
  
}
@Injectable()

export class ProfileService{
    private profile: profile  


    constructor( ) {

    }

    setProfile(profile: profile){
this.profile =profile
    }
  
}

  