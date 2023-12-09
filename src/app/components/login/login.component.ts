import { Component,Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string;
  password:string;
  err:boolean;
  @Input() titulo:string ='Login';

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
  login(){
      this.loginService.login(this.email, this.password)
      .then(res =>{
        this.router.navigate(['/'])
      })
      .catch(error =>{
        this.err = true;
      })
  }
}

