import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresasServices } from '../../../../../services/empresas.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
    selector: 'empresas-listar',
    templateUrl: './empresas-listar.component.html',
})

export class EmpresaListarComponent{

    public empresas = [];

    display='none';

    public modal_title = "";
    public modal_body = "";

    private eliminar_emp = false;
    private index;
    private empresa;

    constructor(
        private empresaService: EmpresasServices,
        private router: Router,
        private spinnerService: Ng4LoadingSpinnerService,
    ){
        this.spinnerService.show();
        this.obtenerEmpresas();
    }

    obtenerEmpresas(){
        this.empresaService.getEmpresas().toPromise()
        .then((res:any)=>{
            if(res.status == "200"){
                for(var i=0; i<res.response.length; i++){                
                    this.empresas.push(res.response[i])
                }
            }
            this.spinnerService.hide();
        })
        .catch((err)=>{
            this.spinnerService.hide();
            this.openModal("Error Empresas","Error al cargar las empresas, volver a intentar más tarde.");
        })
    }

    detallesEmpresa(id_empresa){
        this.router.navigate(['/admin/empresas/detalles/'+id_empresa]);
    }

    editarEmpresa(id_empresa){
        this.router.navigate(['/admin/empresas/editar/'+id_empresa]);
    }

    eliminarEmpresaModal(index, empresa){
        this.index = index;
        this.empresa = empresa;
        this.eliminar_emp = true;
        this.openModal("Eliminar Empresa","¿Estás seguro de eliminar la empresa " + empresa.nombre + " ?. Un vez eliminada, también se eliminar todos los servidores y usuarios relacionados.");
    }

    closeModalEliminar(){
        this.display='none';
        this.eliminar_emp = false;
        this.eliminarEmpresa()
    }
    
    eliminarEmpresa(){

        this.empresaService.deleteEmpresa(this.empresa.id).toPromise()
        .then((res:any)=>{
            if(res.status == "200"){
                this.empresas.splice(this.index,1);
                this.openModal("Empresa Eliminada","Se eliminó correctamente la empresa " + this.empresa.nombre +".");
            }
            this.spinnerService.hide();
        })
        .catch((err)=>{
            this.openModal("Error Eliminar Empresas","Error al eliminar las empresa " + this.empresa.nombre + ", volver a intentar más tarde.");
            this.spinnerService.hide();
        })
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