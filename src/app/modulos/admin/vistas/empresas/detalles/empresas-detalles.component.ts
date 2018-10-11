import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresasServices } from '../../../../../services/empresas.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
    selector: 'empresas-detalles',
    templateUrl: './empresas-detalles.component.html',
})
export class EmpresaDetallesComponent implements OnInit, OnDestroy{

    private sub: any;

    display='none';

    public id = "";
    public nombre = "";
    public direccion = "";
    public descripcion = "";

    public modal_title = "";
    public modal_body = "";

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private empresaService: EmpresasServices,
        private spinnerService: Ng4LoadingSpinnerService,
    ){

    }

    ngOnInit() {
        this.spinnerService.show();
        this.sub = this.route.params.subscribe(
            (res=>{
                this.obtenerEmpresa(res.id);
            }),err =>{
                this.spinnerService.hide();
                this.openModal("Error obtener Empresa","Error al obtener los datos de la Empresa. Volver a intenter más tarde.")
        })
    }

    obtenerEmpresa(id_empresa){   
        this.empresaService.getEmpresa(id_empresa).toPromise()
        .then((res:any)=>{
            
            if(res.status == "200"){
                this.id = res.response[0].id;
                this.nombre = res.response[0].nombre;
                this.direccion = res.response[0].direccion;
                this.descripcion = res.response[0].descripcion;

                this.spinnerService.hide();
            }else{
                this.spinnerService.hide();
                this.openModal("Error obtener Empresa","Error al obtener los datos de la Empresa. Volver a intenter más tarde.")
            }
        })
        .catch((err)=>{
            this.openModal("Error obtener Empresa","Error al obtener los datos de la Empresa. Volver a intenter más tarde.")
            this.spinnerService.hide();
        })
    }

    editarEmpresa(){
        this.router.navigate(['/admin/empresas/editar/'+this.id]);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
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