import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresasServices } from '../../../../../services/empresas.service';
import { FirebaseAppService } from '../../../../../object/user/service.firebase';
import { UsuariosService } from '../../../../../services/usuarios.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
    selector: 'usuarios-agregar',
    templateUrl: './usuarios-agregar.component.html',
})

export class UsuariosAgregarComponent implements OnInit {

    private id = ""
    public nombre = "";
    public apellido = "";
    public email = "";
    public password = "";
    public confPassword = "";
    public empresa = 0;
    public tipo = null;

    public empresas = [];
    public tipos = [
        { "nombre": "Administrador", "id": 1 },
        { "nombre": "Usuario", "id": 2 },
    ]
    public display = 'none';

    public modal_title = "";
    public modal_body = "";

    constructor(
        private empresaService: EmpresasServices,
        private firebaseService: FirebaseAppService,
        private usuarioService: UsuariosService,
        private spinnerService: Ng4LoadingSpinnerService
    ) {

    }

    ngOnInit() {
        this.obtenerEmpresas();
    }



    obtenerEmpresas() {
        this.empresaService.getEmpresas().toPromise()
            .then((res: any) => {
                if (res.status == "200") {
                    if (res.response.length > 1) {

                        this.empresa = res.response[0].id;
                        this.tipo = 1;

                        for (var i = 0; i < res.response.length; i++) {
                            this.empresas.push(res.response[i]);
                        }
                    }
                }
            })
            .catch((err) => {
                this.openModal("Error Empresas", "Error al Cargar Todas las Empresas. Volver a intentar más tarde.");
            })
    }


    onChangeTipo(tipo) {
        this.tipo = Number(tipo);
    }

    onChangeEmpresa(empresa) {
        this.empresa = Number(empresa);
    }
    enviarUsuarioFB() {
        this.firebaseService.createUser(this.email, this.password)
            .then((res: any) => {
                this.id = res.uid;
                this.enviarUsuarioDB()
            })
            .catch((err) => {
                this.spinnerService.hide();
                this.openModal("Error Usuario", "Error al guardar el usuario " + this.nombre + " " + this.apellido + ". Volver a intentar más tarde.");
            })
    }

    enviarUsuarioDB() {
        this.usuarioService.postUser({ "id": this.id, "nombre": this.nombre, "apellido": this.apellido, "tipo": this.tipo, "id_empresa": this.empresa }).toPromise()
            .then((res: any) => {
                if (res.status == "200") {
                    this.spinnerService.hide();
                    this.openModal("Usuario Guardado", "El usuario " + this.nombre + " " + this.apellido + " se guardó de manera exitosa.");
                    this.restaurarDatos();
                }
            })
            .catch((err) => {
                this.spinnerService.hide();
                this.openModal("Error Usuario", "Error al guardar el usuario " + this.nombre + " " + this.apellido + ". Volver a intentar más tarde.");
            })
    }

    guardarUsuario(form) {
        if (form.valid) {
            if (this.password == this.confPassword) {
                if(this.password.match("^[a-zA-Z0-9]{8,}$")){
                    this.spinnerService.show();
                    this.enviarUsuarioFB();
                }else{
                    this.openModal("Error Contraseña", "La contraseña debe tener: Mínimo ocho caracteres, al menos una letra y un número:");    
                }
            } else {
                this.openModal("Error Contraseñas", "Verificar que las contraseñas sean iguales.");
            }
        } else {
            this.openModal("Error Formulario", "Verificar que todos los campos no se encuentren vacios (Nombre, Apelldio, Correo, Contraseña, Apelldio).");
        }
    }

    restaurarDatos() {
        this.id = ""
        this.nombre = "";
        this.apellido = "";
        this.email = "";
        this.password = "";
        this.confPassword = "";
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