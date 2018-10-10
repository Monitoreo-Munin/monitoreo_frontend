import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresasServices } from '../../../../../services/empresas.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
    selector: 'empresas-editar',
    templateUrl: './empresas-editar.component.html',
})

export class EmpresaEditarComponent implements OnInit, OnDestroy{

    private sub: any;

    public id = "";
    public nombre = "";
    public direccion = "";
    public descripcion = "";

    display='none';

    public modal_title = "";
    public modal_body = "";

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private empresaService: EmpresasServices,
        private spinnerService: Ng4LoadingSpinnerService,
    ){
        spinnerService.show()
    }


    ngOnInit() {
        this.sub = this.route.params.subscribe(
            (res=>{
                this.obtenerEmpresa(res.id);
            }),err =>{
                this.spinnerService.hide();
                this.openModal("Error obtener Empresa","Error al obtener los datos de la Empresa. Volver a intenter más tarde.")
        })
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    obtenerEmpresa(id_empresa){   
        this.empresaService.getEmpresa(id_empresa).toPromise()
        .then((res:any)=>{
            
            if(res.status == "200"){
                this.id = res.response[0].id;
                this.nombre = res.response[0].nombre;
                this.direccion = res.response[0].direccion;
                this.descripcion = res.response[0].descripcion;
            }

            this.spinnerService.hide();
        })
        .catch((err)=>{
            this.openModal("Error obtener Empresa","Error al obtener los datos de la Empresa. Volver a intenter más tarde.")
            this.spinnerService.hide();
        })
    }

    editarEmpresa(form){
        if(form.valid){
            this.spinnerService.show();
            this.empresaService.putEmpresa({"id":this.id, "nombre":this.nombre, "direccion":this.direccion,"descripcion":this.descripcion}).toPromise()
            .then((res:any)=>{
                this.spinnerService.hide();
                if(res.status == "200"){
                    this.router.navigate(['/admin/empresas/detalles/'+this.id]);
                }
            })
            .catch((err)=>{
                this.spinnerService.hide();
                this.openModal("Error Actualizar Empresa","Error al actualizar los datos de la Empresa. Volver a intenter más tarde.")
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