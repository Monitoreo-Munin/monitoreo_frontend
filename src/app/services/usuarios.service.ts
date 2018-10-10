import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsuariosService {

    private url = "http://127.0.0.1:3000/api/users/";

    constructor(
        private httpCliente: HttpClient
    ){

    }

    getUsers(){
        return this.httpCliente.get(this.url);
    }

    getUser(id_user){
        return this.httpCliente.get(this.url+id_user);
    }

    postUser(user){
        return this.httpCliente.post(this.url,user);
    }

    putUser(user){
        return this.httpCliente.put(this.url, user);
    }

    deleteUser(id_user){
        return this.httpCliente.delete(this.url+id_user);
    }
}