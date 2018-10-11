import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageSession } from '../../object/user/session.storage';
import { FirebaseAppService } from '../../object/user/service.firebase';

@Component({
  selector: 'principal',
  templateUrl: './principal.component.html'
})
export class PrincipalComponent {
  
  constructor(
    private router: Router,
    private localStorage: LocalStorageSession,
  ){
    if(!this.localStorage.getSessionActual()){
      this.router.navigate(['/admin']);
    }

  }

}
