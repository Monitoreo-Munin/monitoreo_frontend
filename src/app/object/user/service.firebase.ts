
import {Injectable} from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { LocalStorageSession } from './session.storage';
import { resolve, reject } from 'q';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
 
@Injectable()
export class FirebaseAppService {
 
    isLoggedIn: boolean = false;
 
    public user;
 
    constructor(
        private router: Router,
        private af: AngularFireAuth,
        private ls: LocalStorageSession,
        private us: UsuariosService) {
        
    }
 
    login(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.af.auth.signInWithEmailAndPassword(email, password).then(auth => {
                this.us.getUser(auth.uid).toPromise()
                .then((res:any)=>{
                    if(res.status == "200"){
                        var nombre = res.response[0].nombre + " "+ res.response[0].apellido;
                        this.ls.saveCurrentUser(auth.uid, auth.email, auth.isAnonymous , nombre);
                        resolve(auth)
                    }else{
                        reject(res)
                    }
                })
                .then(err=>{
                    reject(err)
                })
            }).catch(err => {
                reject(err)
            })
        })
    }
 
    logout():Promise<any> {
        return new Promise((resolve, reject)=>{
            this.af.auth.signOut().then(res =>{
                this.ls.deleteCurrentUser();
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
        
    }


    createUser(email, password):Promise<any> {
        return new Promise((resolve, reject)=>{
            this.af.auth.createUserWithEmailAndPassword(email,password)
            .then((res)=>{
                resolve(res)
            })
            .catch((err)=>{
                reject(err)
            })
        })
        
    }
}