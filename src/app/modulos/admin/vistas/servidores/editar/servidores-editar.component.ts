import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresasServices } from '../../../../../services/empresas.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ServidoresService } from '../../../../../services/servidores.service';


@Component({
    selector: 'servidores-editar',
    templateUrl: './servidores-editar.component.html',
})

export class ServidoresEditarComponent {

    private sub: any;

    private id;
    public nombre = "";
    public descripcion = "";
    public ip = "";
    public selectEmpresa:any;
    public empresa;

    public empresas = [];

    display = 'none';

    public modal_title = "";
    public modal_body = "";

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private empresaService: EmpresasServices,
        private servidorService: ServidoresService,
        private spinnerService: Ng4LoadingSpinnerService
    ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            (res=>{
                Promise.all([this.obtenerServidor(res.id),this.obtenerEmpresas()])
            }),err =>{
                this.spinnerService.hide();
                this.openModal("Error obtener Empresa","Error al obtener los datos de la Empresa. Volver a intenter más tarde.")
        })
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onChangeEmpresa(empresa) {
        this.empresa = Number(empresa);
    }

    obtenerServidor(idServer){
        this.servidorService.getServer(idServer).toPromise()
            .then((res:any)=>{
                if(res.status == "200"){

                this.id = res.response[0].id;
                this.nombre = res.response[0].nombre;
                this.descripcion = res.response[0].descripcion;
                this.empresa  = res.response[0].id_empresa;

                var idIp: any = document.getElementById('ip_serv')
                idIp.value = res.response[0].ip;

                }
            })
            .catch((err)=>{
                this.spinnerService.hide();
                this.openModal("Error obtener Empresa","Error al obtener los datos de la Empresa. Volver a intenter más tarde.")
            })
    }

    obtenerEmpresas(){   
        this.empresaService.getEmpresas().toPromise()
        .then((res:any)=>{
            
            if(res.status == "200"){
                if(res.response.length > 1){

                    for (var i = 0; i < res.response.length; i++) {
                        
                        if(this.empresa != res.response[i].id){
                            this.empresas.push(res.response[i]);
                        }else{
                            this.empresas.unshift(res.response[i])
                        }
                    }
                }
            }else{
                this.spinnerService.hide();
                this.openModal("Error obtener Empresa","Error al obtener los datos de la Empresa. Volver a intenter más tarde.")
            }

        })
        .catch((err)=>{
            this.spinnerService.hide();
            this.openModal("Error obtener Empresa","Error al obtener los datos de la Empresa. Volver a intenter más tarde.")
        })
    }

    editarServidor(form){
        var idIp: any = document.getElementById('ip_serv')
        this.ip = String(idIp.value);

        if(form.valid){
            if (this.ip.match('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')) {
                this.enviarDatos();
            } else {
                this.openModal("Error IP Formato", "Verificar que la IP si tenga el formato.");
            }
        }else{
            this.openModal("Error Formulario", "Verificar que todos los campos no se encuentren vacios (Nombre, Descripción, IP, Empresa).");
        }
    }

    enviarDatos(){
        this.spinnerService.show();
        this.servidorService.putServer({"id":this.id, "nombre": this.nombre, "descripcion": this.descripcion, "ip": this.ip, "id_empresa": this.empresa }).toPromise()
            .then((res: any) => {
                if (res.status == "200") {
                    this.spinnerService.hide();
                    this.router.navigate(['/admin/servidores/detalles/'+this.id]);
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

    openModal(title, body) {
        this.modal_title = title;
        this.modal_body = body;
        this.display = 'block';
    }

    closeModal() {
        this.display = 'none';
    }
}
