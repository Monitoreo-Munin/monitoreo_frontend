import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FirebaseAppService } from '../../../../object/user/service.firebase';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  
  public email: string =""
  public password: string =""
  public logout = false;

  display='none';

  constructor(
      private serviceFiebase: FirebaseAppService ,
      private router: Router,
      private spinnerService: Ng4LoadingSpinnerService
    ){
        
    }

    onSubmit(form){
        if(form.valid){
            this.spinnerService.show();
            this.serviceFiebase.login(this.email, this.password)
            .then((res)=>{
                this.spinnerService.hide();
                this.router.navigate(['/admin']);
            }, err =>{
                this.spinnerService.hide();
            });
        }
    }

    openModal(){
        this.display='block'; 
     }

    onCloseHandled(){
        this.display='none'; 
     }
}
