import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresasServices } from '../../../../../services/empresas.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ServidoresService } from '../../../../../services/servidores.service';
import { ApacheService } from '../../../../../services/apache.service';


@Component({
    selector: 'servidores-agregar',
    templateUrl: './servidores-agregar.component.html',
})

export class ServidoresAgregarComponent implements OnInit {

    public nombre = "";
    public descripcion = "";
    public ip = "";
    public empresa;

    public empresas = [];
    private servidores= [];

    display = 'none';

    public modal_title = "";
    public modal_body = "";

    constructor(
        private empresaService: EmpresasServices,
        private servidorService: ServidoresService,
        private apacheService: ApacheService,
        private spinnerService: Ng4LoadingSpinnerService
    ) {

    }

    ngOnInit() {
        this.obtenerEmpresas();
        this.obtenerServidores();
    }

    onChangeEmpresa(empresa) {
        this.empresa = Number(empresa);
    }

    obtenerServidores(){
        this.servidorService.getServers().toPromise()
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

    obtenerEmpresas() {
        this.empresaService.getEmpresas().toPromise()
            .then((res: any) => {
                if (res.status == "200") {
                    if (res.response.length > 1) {

                        this.empresa = res.response[0].id;

                        for (var i = 0; i < res.response.length; i++) {
                            this.empresas.push(res.response[i]);
                        }
                    }
                }else{
                    this.openModal("Error Empresas", "Error al Cargar Todas las Empresas. Volver a intentar más tarde.");
                }
            })
            .catch((err) => {
                this.openModal("Error Empresas", "Error al Cargar Todas las Empresas. Volver a intentar más tarde.");
            })
    }

    guardarServidor(form) {

        var idIp: any = document.getElementById('ip_serv')
        this.ip = String(idIp.value);
        
        if (form.valid) {
            if (this.ip.match('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')) {
                
                var ok = true;
                for(var i =0; i< this.servidores.length; i++){
                    if(this.servidores[i].ip == this.ip){
                        ok = false;
                        break;
                    }
                }

                if(ok){
                    this.enviarDatos();
                }else{
                    this.openModal("Error Dirrección IP", "La IP "+ this.ip+ " ya se encuentra registrada.");
                }
            } else {
                this.openModal("Error IP Formato", "Verificar que la IP si tenga el formato.");
            }
        } else {
            this.openModal("Error Formulario", "Verificar que todos los campos no se encuentren vacios (Nombre, Descripción, IP, Empresa).");
        }
    }

    enviarDatos() {

        this.spinnerService.show();

        var server = ({ "nombre": this.nombre, "descripcion": this.descripcion, "ip": this.ip, "id_empresa": this.empresa });
        var ip_st = server.ip.replace('.','_').replace('.','_').replace('.','_');
        var ip = ({"ip":ip_st})


        Promise.all([this.servidorService.postServer(server).toPromise(),
                     this.apacheService.createAccess(ip).toPromise(),
                     this.apacheService.createProcess(ip).toPromise(),
                     this.apacheService.createVolume(ip).toPromise()])
                     .then((res: any) => {
                        var ok = false;
                         for(var i=0; i<res.length; i++){
                             if(res[i].status == "200"){
                                 ok = true;
                             }else{
                                 ok = false;
                                 break;
                             }
                         }
                        if (ok) {
                            this.spinnerService.hide();
                            this.openModal("Servidor Guardado", "El servidor " + this.nombre + " se guardó de manera exitosa.");
                            this.restaurarDatos();
                        }else{
                            this.spinnerService.hide();
                            this.openModal("Error Servidor", "Error al guardar el servidor. Volver a intentar más tarde");
                        }
                        
                    })
                    
                    .catch((err) => {
                        console.error(err)
                        this.spinnerService.hide();
                        this.openModal("Error Servidor", "Error al guardar el servidor. Volver a intentar más tarde");
                    })
    }

    restaurarDatos() {
        this.nombre = "";
        this.descripcion = "";
        this.ip = "";
        var idIp: any = document.getElementById('ip_serv')
        idIp.value = "";
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