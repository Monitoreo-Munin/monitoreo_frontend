import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresasServices } from '../../../../../services/empresas.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ServidoresService } from '../../../../../services/servidores.service';


@Component({
    selector: 'servidores-detalles',
    templateUrl: './servidores-detalles.component.html',
})

export class ServidoresDetallesComponent implements OnInit, OnDestroy {

    private sub: any;

    display = 'none';

    public id = "";
    public nombre = "";
    public ip = "";
    public descripcion = "";
    public nombre_empresa = "";

    public modal_title = "";
    public modal_body = "";

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private servidorService: ServidoresService,
        private spinnerService: Ng4LoadingSpinnerService,
    ) {

    }

    ngOnInit() {
        this.spinnerService.show();
        this.sub = this.route.params.subscribe(
            (res => {
                this.obtenerServidor(res.id);
            }), err => {
                this.spinnerService.hide();
                this.openModal("Error obtener Servidor", "Error al obtener los datos del Servidor. Volver a intenter más tarde.")
            })
    }

    obtenerServidor(id) {
        this.servidorService.getServer(id).toPromise()
            .then((res: any) => {
                if (res.status == "200") {
                    this.id = res.response[0].id;
                    this.nombre = res.response[0].nombre;
                    this.ip = res.response[0].ip;
                    this.descripcion = res.response[0].descripcion;
                    this.nombre_empresa = res.response[0].nombre_empresa;

                    this.spinnerService.hide();
                } else {
                    this.spinnerService.hide();
                    this.openModal("Error obtener Servidor", "Error al obtener los datos del Servidor. Volver a intenter más tarde.")
                }
            })
            .catch((err) => {
                this.spinnerService.hide();
                this.openModal("Error obtener Servidor", "Error al obtener los datos del Servidor. Volver a intenter más tarde.")
            })
    }
    editarServidor() {
        this.router.navigate(['/admin/servidores/editar/' + this.id]);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
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
