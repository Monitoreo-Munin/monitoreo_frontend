import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgModule,
  ErrorHandler,
  Injectable,
  ApplicationRef,
  Provider,
  OnInit,
  OnDestroy,
} from '@angular/core';

import {
  Http,
  HttpModule,
  BaseRequestOptions,
  RequestOptions,
  RequestOptionsArgs,
} from '@angular/http';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FirebaseAppService } from './object/user/service.firebase';
import { LocalStorageSession } from './object/user/session.storage';
import 'rxjs/add/operator/map'


import { AdminModule } from './modulos/admin/admin.module';
import { PrincipalModule } from './modulos/principal/principal.module';

import { AppComponent } from './app.component';
import { UsuariosService } from './services/usuarios.service';
import { EmpresasServices } from './services/empresas.service';
import { ServidoresService } from './services/servidores.service';


const appRoutes: Routes = [
  { path: '', loadChildren: ()=> PrincipalModule },
  { path: 'admin', loadChildren: ()=> AdminModule }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AdminModule,
    PrincipalModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule.withServerTransition({ appId: 'universal' }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    FirebaseAppService,
    LocalStorageSession,
    UsuariosService,
    EmpresasServices,
    ServidoresService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
