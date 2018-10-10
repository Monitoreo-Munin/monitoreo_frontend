import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresasServices } from '../../../../../services/empresas.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
    selector: 'empresas-agregar',
    templateUrl: './empresas-agregar.component.html',
})

export class EmpresasAgregarComponent{

    
    public nombre = "";
    public direccion = "";
    public descripcion = "";

    display='none';

    public modal_title = "";
    public modal_body = "";

    constructor(
        private empresaService: EmpresasServices,
        private spinnerService: Ng4LoadingSpinnerService,
    ){

    }

    guardarEmpresa(form){
    
        if(form.valid){
            this.spinnerService.show()
            this.empresaService.postEmpresa({"nombre":this.nombre,"direccion":this.direccion,"descripcion":this.descripcion}).toPromise()
            .then((res)=>{
                this.spinnerService.hide();
                this.openModal("Guardar Empresa", "La Empresa "+this.nombre+ " se ha guardado con exito.");
            })
            .catch((err)=>{
                this.spinnerService.hide();
                this.openModal("Error Guardar Empresa", "Error al Guardar la Empresa, Volver a intentar más tarde.");
            })
        }else{
            this.openModal("Error Formulario", "Verificar que todos los campos no se encuentren vacios (Nombre, Direccion, Descripción).");
        }
        
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