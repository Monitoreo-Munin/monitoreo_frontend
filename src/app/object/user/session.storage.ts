
import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { FirebaseAppService } from './service.firebase';

 
@Injectable()
export class LocalStorageSession {

    private Session = "AdminLTE";
    private key = "Jerez00";
    public user ={
        uid: "",
        email:"",
        isAnonymous: "",
        nombre: ""
    }

    constructor(){}



    saveCurrentUser(uid, email, isAnoymous, nombre){
        
        /**
         *  var ciphertext = CryptoJS.AES.encrypt('my message', this.key);
        var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), this.key);
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
         */

        var c_uid = CryptoJS.AES.encrypt(uid, this.key);
        var c_email = CryptoJS.AES.encrypt(email, this.key);
        var c_isA = CryptoJS.AES.encrypt(isAnoymous, this.key);
        var c_nom = CryptoJS.AES.encrypt(nombre, this.key);

        this.user.uid = String(c_uid)
        this.user.email = String(c_email)
        this.user.isAnonymous = String(c_isA)
        this.user.nombre = String(c_nom)

        localStorage.setItem(this.Session,JSON.stringify(this.user));
         
    }

    deleteCurrentUser(){
        localStorage.removeItem(this.Session)
    }

    getSessionActual(): boolean{
        var actual:any = localStorage.getItem(this.Session);
        if(actual == null){
            return true;
        }else{
            if(actual.email == "" && actual.uid == ""){
                return true
            }else{
                return false;
            }
            
        }
    }

}