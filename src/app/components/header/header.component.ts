import { Component, } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Configuracion } from 'src/app/modelo/configuracion.model';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  modalListSettings: string = 'hidden'
  isLoggedIn: Boolean;
  loggedInUser: String;
  permitirRegistro?: boolean;

  constructor(
    private authService: AngularFireAuth,
    private loginService: LoginService,
    private router: Router,
    private configuracionServicio: ConfiguracionServicio
  ) { }
  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email || '';
      }
      else {
        this.isLoggedIn = false;
      }
    });

    this.configuracionServicio.getConfiguracion().subscribe(configuracion => {
      this.permitirRegistro = configuracion.permitirRegistro;
    });
  }
  mostrarmodal() {
    if (this.modalListSettings == 'hidden') {
      this.modalListSettings = '';
      setTimeout(() => {
        this.modalListSettings = 'hidden'
      }, 5000);
    } else this.modalListSettings = 'hidden';
  }
  async logout() {
    try {
      await this.authService.signOut();
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during logout:', error);
      // Puedes manejar el error de manera personalizada aquí, por ejemplo, mostrando una notificación.
    }
  }


}
