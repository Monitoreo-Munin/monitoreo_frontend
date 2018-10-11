import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageSession } from './object/user/session.storage';
import { FirebaseAppService } from './object/user/service.firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){}
}
