import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmpresasServices{
 
    private url = "http://127.0.0.1:3000/api/empresas/";

    constructor(
        private httpCliente: HttpClient
    ){
    }

    getEmpresas(){
        return this.httpCliente.get(this.url);
    }

    getEmpresa(id_empresa){
        return this.httpCliente.get(this.url+id_empresa);
    }

    postEmpresa(empresa){
        return this.httpCliente.post(this.url,empresa);
    }

    putEmpresa(empresa){
        return this.httpCliente.put(this.url, empresa);
    }

    deleteEmpresa(id_empresa){
        return this.httpCliente.delete(this.url+id_empresa);
    }
}