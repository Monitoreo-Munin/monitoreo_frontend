import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MonitoreoServices } from '../../../../../services/monitoreos.service';


@Component({
    selector: 'monitoreos-listar',
    templateUrl: './monitoreos-listar.component.html',
})
export class MonitoreosListarComponent implements OnInit {
    
    public monitoreos = [];

    display='none';

    public modal_title = "";
    public modal_body = "";

    private eliminar_mon = false;
    private index;

    private monitoreo;

    constructor(
        private monitoreoService: MonitoreoServices,
        private spinnerService: Ng4LoadingSpinnerService,
    ){
    }

    ngOnInit(){
        this.spinnerService.show();
        this.obtenerMonitoreos();
    }

    obtenerMonitoreos(){
        this.monitoreoService.getMonitoreos().toPromise()
        .then((res:any)=>{
            this.monitoreos = res.response;
            this.spinnerService.hide();
        })
        .catch((err)=>{
            this.spinnerService.hide();
            this.openModal("Error Tipos de Monitoros","Error al cargar los Tipos de Monitoros, volver a intentar más tarde.");
        })
    }

    eliminarMonitoreoModal(index, monitoreo){
        this.index = index;
        this.monitoreo = monitoreo;
        this.eliminar_mon = true;
        this.openModal("Eliminar Monitoreo","¿Estás seguro de eliminar el Monitoreo " + monitoreo.nombre + " ?. Un vez eliminada, también se eliminar todos los datos relacionados al monitoreo");
    }

    closeModalEliminar(){
        this.display='none';
        this.eliminar_mon = false;
        this.eliminarMonitoreo()
    }

    eliminarMonitoreo(){

        this.monitoreoService.deleteMonitoreo(this.monitoreo.id).toPromise()
        .then((res:any)=>{
            if(res.status == "200"){
                this.monitoreos.splice(this.index,1);
                this.spinnerService.hide();
                this.openModal("Monitoreo Eliminado","Se eliminó correctamente el Monitoreo " + this.monitoreo.nombre +".");
            }else{
                this.openModal("Error Eliminar Monitoreo","Error al eliminar el Monitoreo " + this.monitoreo.nombre + ", volver a intentar más tarde.");
                this.spinnerService.hide();
            }
        })
        .catch((err)=>{
            this.openModal("Error Eliminar Monitoreo","Error al eliminar el Monitoreo " + this.monitoreo.nombre + ", volver a intentar más tarde.");
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