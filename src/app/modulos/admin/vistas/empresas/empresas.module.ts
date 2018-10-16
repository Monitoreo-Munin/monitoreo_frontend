import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { EmpresasComponent } from './empresas.component';

import { EmpresasAgregarComponent } from './agregar/empresas-agregar.component';
import { EmpresasServices } from '../../../../services/empresas.service';
import { EmpresaListarComponent } from './listar/empresas-listar.component';
import { EmpresaEditarComponent } from './editar/empresas-editar.component';
import { EmpresaDetallesComponent } from './detalles/empresas-detalles.component';
import { LocalStorageSession } from '../../../../object/user/session.storage';

const appRoutes: Routes = [
  {
    path: 'empresas', component: EmpresasComponent,
    children: [
      { path: '', component: EmpresaListarComponent },
      { path: 'agregar', component: EmpresasAgregarComponent },
      { path: 'editar/:id', component: EmpresaEditarComponent },
      { path: 'detalles/:id', component: EmpresaDetallesComponent }
    ]
  }
];

@NgModule({
  declarations: [
    EmpresasComponent,
    EmpresaListarComponent,
    EmpresasAgregarComponent,
    EmpresaEditarComponent,
    EmpresaDetallesComponent
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
    EmpresasServices
  ],
  bootstrap: []
})

export class EmpresasModule {

  constructor(
    private localStorage: LocalStorageSession,
    private router: Router
  ) {
    if (this.localStorage.getSessionActual()) {
      this.router.navigate(['/login']);
    }
  }
}