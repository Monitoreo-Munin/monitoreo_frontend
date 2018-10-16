import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { ServidoresComponent } from './servidores.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ServidoresListarComponent } from './listar/servidores-listar.component';
import { ServidoresAgregarComponent } from './agregar/servidores-agregar.component';
import { ServidoresEditarComponent } from './editar/servidores-editar.component';
import { ServidoresDetallesComponent } from './detalles/servidores-detalles.component';
import { LocalStorageSession } from '../../../../object/user/session.storage';

const appRoutes: Routes = [
  {
    path: 'servidores', component: ServidoresComponent,
    children: [
      { path: '', component: ServidoresListarComponent },
      { path: 'agregar', component: ServidoresAgregarComponent },
      { path: 'editar/:id', component: ServidoresEditarComponent },
      { path: 'detalles/:id', component: ServidoresDetallesComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ServidoresComponent,
    ServidoresListarComponent,
    ServidoresAgregarComponent,
    ServidoresEditarComponent,
    ServidoresDetallesComponent
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

export class ServidoresModule {

  constructor(
    private localStorage: LocalStorageSession,
    private router: Router
  ) {
    if (this.localStorage.getSessionActual()) {
      this.router.navigate(['/login']);
    }
  }
}