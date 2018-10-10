import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './empresas.component';

const appRoutes: Routes = [
    { path: 'empresas', component: EmpresasComponent}
  ];

@NgModule({
    declarations: [
      EmpresasComponent
    ],
    imports: [
      CommonModule,
      RouterModule.forChild(appRoutes),
    ],
    providers: [
    ],
    bootstrap: []
  })

export class EmpresasModule{

}