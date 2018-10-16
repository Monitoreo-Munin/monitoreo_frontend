import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MonitoreoServices } from '../../../../../services/monitoreos.service';


@Component({
    selector: 'monitoreos-agregar',
    templateUrl: './monitoreos-agregar.component.html',
})
export class MonitoreosAgregarComponent{
    

    public nombre = "";

    display='none';

    public modal_title = "";
    public modal_body = "";

    constructor(
        private monitoreoService: MonitoreoServices,
        private spinnerService: Ng4LoadingSpinnerService,
    ){

    }

    guardarMonitoreo(form){
    
        if(form.valid){
            this.spinnerService.show()
            this.monitoreoService.postMonitoreo({"nombre":this.nombre}).toPromise()
            .then((res)=>{
                this.resetearDatos()
                this.spinnerService.hide();
                this.openModal("Guardar Monitoreo", "El monitoreo "+this.nombre+ " se ha guardado con exito.");
            })
            .catch((err)=>{
                this.spinnerService.hide();
                this.openModal("Error Guardar Monitoreo", "Error al Guardar el monitoreo, Volver a intentar más tarde.");
            })
        }else{
            this.openModal("Error Formulario", "Verificar que todos los campos no se encuentren vacios (Nombre).");
        }
        
    }

    resetearDatos(){
        this.nombre = "";
    }

    openModal(title,body){
        this.modal_title = title;
        this.modal_body = body;
        this.display='block'; 
     }

    closeModal(){
        this.display='none'; 
     }
}