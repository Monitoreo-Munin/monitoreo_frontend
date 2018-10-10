import { NgModule, Component } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { EmpresasComponent } from './empresas.component';

import { EmpresasAgregarComponent } from './agregar/empresas-agregar.component';
import { EmpresasServices } from '../../../../services/empresas.service';

const appRoutes: Routes = [
    { path: '', component: EmpresasComponent,
    children:[
      {path: 'agregar', component: EmpresasAgregarComponent},
    ]}
  ];

@NgModule({
    declarations: [
      EmpresasComponent,
      EmpresasAgregarComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      Ng4LoadingSpinnerModule.forRoot(),
      RouterModule.forChild(appRoutes),
    ],
    providers: [
      EmpresasServices
    ],
    bootstrap: []
  })

export class EmpresasModule{

}