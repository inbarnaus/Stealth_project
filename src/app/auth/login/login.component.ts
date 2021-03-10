import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})

  export class NgxLoginComponent extends NbLoginComponent {
    user: any;

    constructor(
      service: NbAuthService,
      @Inject(NB_AUTH_OPTIONS) protected options,
      cd: ChangeDetectorRef,
      router: Router,
      private http: HttpClient
    ) {
      super(service, options, cd, router);
    }
    
    async login(){
      const headers = { 'content-type': 'application/json'} 
      const body = JSON.stringify(this.user);
      let response = await this.http.post('/auth/login', body, {'headers':headers}) 
      response.subscribe(
        res=> {
          if(res['succeeded']){
            console.log("POST completed sucessfully");
            this.router.navigate(['/pages/charts/get']);
          }
          else{
            alert("Email or password are wrong, check again");
          }
         },
         error => {
             console.log(error);
         },
         () => {
             console.log("Post Completed");
         }
        );
    }
}