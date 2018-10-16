import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { LoginComponent } from './vistas/login/login.component';
import { NotFoundComponent } from './vistas/not-found/not-found.component';
import { ContenidoComponent } from './vistas/contenido/contenido.component';
import { PrincipalComponent } from './principal.component';
import { LocalStorageSession } from '../../object/user/session.storage';

const appRoutes: Routes = [
  {
    path: '', component: PrincipalComponent,
    children: [
      { path: '', component: ContenidoComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', component: NotFoundComponent }
    ]
  },
];

@NgModule({
  declarations: [
    PrincipalComponent,
    ContenidoComponent,
    LoginComponent,
    NotFoundComponent
  ],
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forChild(appRoutes),
  ],
  providers: [
  ],
  bootstrap: []
})

export class PrincipalModule {

}
