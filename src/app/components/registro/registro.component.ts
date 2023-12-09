import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  email:string;
  password:string;
  err:boolean;
  titulo='Registro '
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(){
    this.loginService.getAuth().subscribe(auth=>{
       if(auth){
         this.router.navigate(['/']);
       }
    })
   }
  registro(){
      this.loginService.registrarse(this.email,this.password)
      .then(res=>{
        this.router.navigate(['/']);
      })
      .catch(error =>{
        this.err = true;
        setTimeout(() => {
          this.err = false;
        }, 4000);
      })
  }
}
