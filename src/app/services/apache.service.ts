import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApacheService{

    private url = "http://127.0.0.1:3000/api/apache/";

    constructor(
        private httpCliente: HttpClient
    ){
    }

    createAccess(ip){
        return this.httpCliente.post(this.url+"access/",ip);
    }

    createProcess(ip){
        return this.httpCliente.post(this.url+"process/",ip);
    }

    createVolume(ip){
        return this.httpCliente.post(this.url+"volume/",ip);
    }

}