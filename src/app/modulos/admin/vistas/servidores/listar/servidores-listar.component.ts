import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresasServices } from '../../../../../services/empresas.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ServidoresService } from '../../../../../services/servidores.service';


@Component({
    selector: 'servidores-listar',
    templateUrl: './servidores-listar.component.html',
})

export class ServidoresListarComponent implements OnInit{

    public servidores = [];

    display = 'none';

    public modal_title = "";
    public modal_body = "";

    public eliminar_ser = false;

    private index;
    private servidor;

    constructor(
        private router: Router,
        private serviceServidores: ServidoresService,
        private spinnerService: Ng4LoadingSpinnerService
    ){

    }

    ngOnInit() {
        this.spinnerService.show();
        this.obtenerServidores();
    }

    obtenerServidores(){
        this.serviceServidores.getServers().toPromise()
        .then((res:any)=>{
            if(res.status == "200"){
                console.log(res.response)
                if(res.response.length > 1){
                    for(var i=0; i< res.response.length; i++){
                        this.servidores.push(res.response[i]);
                    }
                }
                this.spinnerService.hide();
            }else{
                this.spinnerService.hide();
                this.openModal("Error Empresas","Error al cargar las empresas, volver a intentar más tarde.");
            }
        })
        .catch((err)=>{
            this.spinnerService.hide();
            this.openModal("Error Empresas","Error al cargar las empresas, volver a intentar más tarde.");
        })
    }

    detalleServidor(id_server){
        this.router.navigate(['/admin/servidores/detalles/'+id_server])
    }

    editarServidor(id_server){
        this.router.navigate(['/admin/servidores/editar/'+id_server])
    }

    eliminarEmpresaModal(index, servidor){
        this.index = index;
        this.servidor = servidor;
        this.eliminar_ser = true;
        this.openModal('Eliminar Empresa','¿Estás seguro de eliminar el servidor "' + servidor.nombre + '" ?. Un vez eliminado no podras recuperar la información');
    }

    closeModalEliminar(){
        this.display='none';
        this.eliminar_ser = false;
        this.eliminarServidor()
    }

    eliminarServidor(){
        this.spinnerService.show();
        this.serviceServidores.deleteServer(this.servidor.id).toPromise()
        .then((res:any)=>{
            if(res.status == "200"){
                this.servidores.splice(this.index,1);
                this.spinnerService.hide();
                this.openModal("Servidor Eliminado","Se eliminó correctamente el servidor " + this.servidor.nombre +".");
            }else{
                this.spinnerService.hide();
                this.openModal("Error Eliminar Servidor","Error al eliminar el servidor " + this.servidor.nombre + ", volver a intentar más tarde.");
            }
        })
        .catch((err)=>{
            this.spinnerService.hide();
            this.openModal("Error Eliminar Servidor","Error al eliminar el servidor " + this.servidor.nombre + ", volver a intentar más tarde.");
        })
    }


    openModal(title, body) {
        this.modal_title = title;
        this.modal_body = body;
        this.display = 'block';
    }

    closeModal() {
        this.display = 'none';
    }
}
