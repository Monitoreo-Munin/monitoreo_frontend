import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresasServices } from '../../../../../services/empresas.service';
import { FirebaseAppService } from '../../../../../object/user/service.firebase';
import { UsuariosService } from '../../../../../services/usuarios.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
    selector: 'usuarios-listar',
    templateUrl: './usuarios-listar.component.html',
})

export class UsuariosListarComponent implements OnInit{

    public usuarios = [];

    display='none';

    public modal_title = "";
    public modal_body = "";

    private eliminar_usu = false;

    private index;
    private usuario;

    constructor(
        private usuarioService: UsuariosService,
        private spinnerService:Ng4LoadingSpinnerService,
        private router: Router
    ){

    }
    
    ngOnInit(){
        this.obtenerUsuarios();
    }

    detallesUsuario(id_usuario){
        this.router.navigate(['/admin/usuarios/detalles/'+id_usuario]);
    }

    editarUsuario(id_usuario){
        this.router.navigate(['/admin/usuarios/editar/'+id_usuario]);
    }

    eliminarUsuario(){

    }

    obtenerUsuarios(){
        this.spinnerService.show();
        this.usuarioService.getUsers().toPromise()
        .then((res:any)=>{
            if(res.status == "200"){
                if(res.response.length > 1){
                    for(var i=0; i< res.response.length; i++){
                        this.usuarios.push(res.response[i]);
                    }
                }
            }
            this.spinnerService.hide();
        })
        .catch((err)=>{
            this.spinnerService.hide();
            this.openModal("Error Usuarios","Error al obtener los usuarios. Volver a intentar más tarde.");
        })
    }

    eliminarEmpresaModal(index, usuario){
        this.index = index;
        this.usuario = usuario;
        this.eliminar_usu = true;
        this.openModal("Eliminar Empresa","¿Estás seguro de eliminar la empresa " + usuario.nombre + " ?. Un vez eliminado no se podrá recuperar la información de dicho usuario.");
    }

    closeModalEliminar(){
        this.display='none';
        this.eliminar_usu = false;
        this.eliminarUsuario()
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