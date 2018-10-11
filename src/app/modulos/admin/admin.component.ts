import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAppService } from '../../object/user/service.firebase';
import { LocalStorageSession } from '../../object/user/session.storage';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html'
})

export class AdminComponent implements OnInit {

  public nombre_user = "";

  constructor(
    private localStorage: LocalStorageSession,
    private serviceFirebase: FirebaseAppService,
    private router: Router
  ) {
    if (this.localStorage.getSessionActual()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.nombre_user = this.localStorage.getNombreActual();
  }

  singOut() {
    this.serviceFirebase.logout()
      .then((res) => {
        this.router.navigate(['/']);
      }, (err) => {

      })
  }

}
