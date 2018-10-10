import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServidoresComponent } from './servidores.component';

const appRoutes: Routes = [
    { path: 'servidores', component: ServidoresComponent}
  ];

@NgModule({
    declarations: [
        ServidoresComponent
    ],
    imports: [
      CommonModule,
      RouterModule.forChild(appRoutes),
    ],
    providers: [
    ],
    bootstrap: []
  })

export class ServidoresModule{

}