import { NgModule, Component } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosAgregarComponent } from './agregar/usuarios-agregar.component';
import { UsuariosService } from '../../../../services/usuarios.service';

const appRoutes: Routes = [
    {path: 'agregar', component: UsuariosAgregarComponent},
  ];

@NgModule({
    declarations: [
      UsuariosComponent,
      UsuariosAgregarComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      Ng4LoadingSpinnerModule.forRoot(),
      RouterModule.forChild(appRoutes),
    ],
    providers: [
      UsuariosService
    ],
    bootstrap: []
  })

export class UsuariosModule{

}