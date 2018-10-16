import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServidoresService } from '../../../../services/servidores.service';
import { LocalStorageSession } from '../../../../object/user/session.storage';

@Component({
  selector: 'apache',
  templateUrl: './apache.component.html'
})
export class ApacheComponent{
  
  public servers = [];

  constructor(
    private serviceServer: ServidoresService,
    private localStorage: LocalStorageSession
  ){
  }

  calcular(){

    setInterval(()=>{
      //this.apache_2[0] =this.getRandomInt(100);
      //this.apache_2[1] =this.getRandomInt(100);
    },2000)
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * 100) + 90 ;
  }

  ngOnInit() {
    var uid = this.localStorage.getUidActual();
    Promise.all([this.getServers(uid)])
    .then((res)=>{

    })
    .catch((err)=>{

    })
  }

  getServers(id_user){
    this.serviceServer.getServersByUser(id_user).toPromise()
    .then((res:any)=>{
      if(res.status == "200"){
        if(res.response.length > 1){
          this.servers = res.response;
        }
      }
    })
    .catch((err)=>{

    })
  }
  
}
