import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { NotFoundComponent } from './vistas/not-found/not-found.component';
import { ContenidoComponent } from './vistas/contenido/contenido.component';

import { ServidoresModule } from './vistas/servidores/servidores.module';
import { UsuariosModule } from './vistas/usuarios/usuarios.module';
import { EmpresasModule } from './vistas/empresas/empresas.module';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent,
  children: [ 
    {path: '', component: ContenidoComponent},
    {path: 'servidores', loadChildren: ()=>ServidoresModule},
    {path: 'empresas', loadChildren: ()=>EmpresasModule},
    {path: 'usuarios', loadChildren: ()=>UsuariosModule},
    {path: '**', component: NotFoundComponent},
  ] },
];

@NgModule({
  declarations: [
    AdminComponent,
    ContenidoComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    EmpresasModule,
    ServidoresModule,
    UsuariosModule,
    RouterModule.forChild(appRoutes),
  ],
  providers: [
  ],
  bootstrap: []
})

export class AdminModule { }