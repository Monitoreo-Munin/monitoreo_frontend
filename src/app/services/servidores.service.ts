import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServidoresService{
 
    private url = "http://127.0.0.1:3000/api/servers/";

    constructor(
        private httpCliente: HttpClient
    ){

    }

    getServers(){
        return this.httpCliente.get(this.url);
    }

    getServer(id_server){
        return this.httpCliente.get(this.url+id_server);
    }

    getServersByUser(id_user){
        return this.httpCliente.get(this.url+"user/"+id_user);
    }

    postServer(server){
        return this.httpCliente.post(this.url,server);
    }

    putServer(server){
        return this.httpCliente.put(this.url, server);
    }

    deleteServer(id_server){
        return this.httpCliente.delete(this.url+id_server);
    }
}