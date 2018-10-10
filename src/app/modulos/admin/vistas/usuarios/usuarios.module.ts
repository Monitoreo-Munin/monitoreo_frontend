import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosAgregarComponent } from './agregar/usuarios-agregar.component';

const appRoutes: Routes = [
    { path: '', component: UsuariosComponent,
    children:[
      {path: 'agregar', component: UsuariosAgregarComponent},
    ]}
  ];

@NgModule({
    declarations: [
      UsuariosComponent,
      UsuariosAgregarComponent
    ],
    imports: [
      CommonModule,
      RouterModule.forChild(appRoutes),
    ],
    providers: [
    ],
    bootstrap: []
  })

export class UsuariosModule{

}