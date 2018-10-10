import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAppService } from '../../object/user/service.firebase';
import { LocalStorageSession } from '../../object/user/session.storage';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html'
})

export class AdminComponent {
  
  constructor(
    private localStorage: LocalStorageSession,
    private serviceFirebase: FirebaseAppService,
    private router: Router
  ){
    if(this.localStorage.getSessionActual()){
      this.router.navigate(['/login']);
    }
  }

  singOut(){
    this.serviceFirebase.logout()
      .then((res) =>{
        this.router.navigate(['/']);
      }, (err) =>{

      })
  }

}
