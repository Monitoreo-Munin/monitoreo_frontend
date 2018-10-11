import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresasServices } from '../../../../../services/empresas.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ServidoresService } from '../../../../../services/servidores.service';


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

    display = 'none';

    public modal_title = "";
    public modal_body = "";

    constructor(
        private empresaService: EmpresasServices,
        private servidorService: ServidoresService,
        private spinnerService: Ng4LoadingSpinnerService
    ) {

    }

    ngOnInit() {
        this.obtenerEmpresas();
    }

    onChangeEmpresa(empresa) {
        this.empresa = Number(empresa);
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
                this.enviarDatos();
            } else {
                this.openModal("Error IP Formato", "Verificar que la IP si tenga el formato.");
            }
        } else {
            this.openModal("Error Formulario", "Verificar que todos los campos no se encuentren vacios (Nombre, Descripción, IP, Empresa).");
        }
    }

    enviarDatos() {
        this.spinnerService.show();
        this.servidorService.postServer({ "nombre": this.nombre, "descripcion": this.descripcion, "ip": this.ip, "id_empresa": this.empresa }).toPromise()
            .then((res: any) => {
                alert(JSON.stringify(res))
                if (res.status == "200") {
                    this.spinnerService.hide();
                    this.openModal("Servidor Guardado", "El servidor " + this.nombre + " se guardó de manera exitosa.");
                    this.restaurarDatos();
                }else{
                    this.spinnerService.hide();
                    this.openModal("Error Servidor", "Error al guardar el servidor. Volver a intentar más tarde");
                }
                
            })
            .catch((err) => {
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