import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MonitoreoServices{
 
    private url = "http://127.0.0.1:3000/api/monitoreos/";

    constructor(
        private httpCliente: HttpClient
    ){
    }

    getMonitoreos(){
        return this.httpCliente.get(this.url);
    }

    postMonitoreo(monitoreo){
        return this.httpCliente.post(this.url,monitoreo);
    }

    deleteMonitoreo(id_monitoreo){
        return this.httpCliente.delete(this.url+id_monitoreo);
    }

}