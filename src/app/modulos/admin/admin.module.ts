import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
'@angular/platform-browser/animations';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { AdminComponent } from './admin.component';
import { NotFoundComponent } from './vistas/not-found/not-found.component';
import { ContenidoComponent } from './vistas/contenido/contenido.component';

import { ServidoresModule } from './vistas/servidores/servidores.module';
import { UsuariosModule } from './vistas/usuarios/usuarios.module';
import { EmpresasModule } from './vistas/empresas/empresas.module';
import { EmpresasServices } from '../../services/empresas.service';
import { UsuariosService } from '../../services/usuarios.service';

import { ApacheComponent } from './vistas/apache/apache.component';
import { ApacheService } from '../../services/apache.service';
import { MonitoreoServices } from '../../services/monitoreos.service';
import { MonitoreosModule } from './vistas/monitoreos/monitoreos.module';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent,
  children: [ 
    {path: '', component: ContenidoComponent},
    {path: '', loadChildren: ()=>ServidoresModule},
    {path: '', loadChildren: ()=>UsuariosModule},
    {path: '', loadChildren: ()=>EmpresasModule},
    {path: '', loadChildren: ()=>MonitoreosModule},
    {path: 'apache', component: ApacheComponent},
    {path: '**', component: NotFoundComponent},
  ] },
];

@NgModule({
  declarations: [
    AdminComponent,
    ContenidoComponent,
    NotFoundComponent,
    ApacheComponent
  ],
  exports:[
    RouterModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule,
    NgCircleProgressModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forChild(appRoutes),
  ],
  providers: [
    EmpresasServices,
    UsuariosService,
    MonitoreoServices,
    ApacheService
  ],
  bootstrap: []
})

export class AdminModule { 
  
}
