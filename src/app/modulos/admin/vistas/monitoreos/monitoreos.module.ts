import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { LocalStorageSession } from '../../../../object/user/session.storage';
import { MonitoreosListarComponent } from './listar/monitoreos-listas.component';
import { MonitoreosComponent } from './monitoreos.component';
import { MonitoreosAgregarComponent } from './agregar/monitoreos-agregar.component';

const appRoutes: Routes = [
  {
    path: 'monitoreos', component: MonitoreosComponent,
    children: [
      { path: '', component: MonitoreosListarComponent },
      { path: 'agregar', component: MonitoreosAgregarComponent },
    ]
  }
];

@NgModule({
  declarations: [
    MonitoreosComponent,
    MonitoreosListarComponent,
    MonitoreosAgregarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forChild(appRoutes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ],
  bootstrap: []
})

export class MonitoreosModule {

  constructor(
    private localStorage: LocalStorageSession,
    private router: Router
  ) {
    if (this.localStorage.getSessionActual()) {
      this.router.navigate(['/login']);
    }
  }
}