import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AdminComponent } from './admin.component';
import { NotFoundComponent } from './vistas/not-found/not-found.component';
import { ContenidoComponent } from './vistas/contenido/contenido.component';

import { ServidoresModule } from './vistas/servidores/servidores.module';
import { UsuariosModule } from './vistas/usuarios/usuarios.module';
import { EmpresasModule } from './vistas/empresas/empresas.module';
import { EmpresasServices } from '../../services/empresas.service';
import { UsuariosService } from '../../services/usuarios.service';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent,
  children: [ 
    {path: '', component: ContenidoComponent},
    {path: '', loadChildren: ()=>ServidoresModule},
    {path: '', loadChildren: ()=>UsuariosModule},
    {path: '', loadChildren: ()=>EmpresasModule},
    {path: '**', component: NotFoundComponent},
  ] },
];

@NgModule({
  declarations: [
    AdminComponent,
    ContenidoComponent,
    NotFoundComponent
  ],
  exports:[
    RouterModule
  ],
  imports: [
    CommonModule,
    EmpresasModule,
    ServidoresModule,
    UsuariosModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forChild(appRoutes),
  ],
  providers: [
    EmpresasServices,
    UsuariosService
  ],
  bootstrap: []
})

export class AdminModule { }
