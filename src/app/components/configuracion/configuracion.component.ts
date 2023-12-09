import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/modelo/configuracion.model';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {
  permitirRegistro = false;
  miTitulo='Configuración';
  constructor(private router: Router,
    private configuracionServicio: ConfiguracionServicio) { }

  ngOnInit() {
    this.configuracionServicio.getConfiguracion().subscribe(
      (configuracion:Configuracion)=>{
        this.permitirRegistro = configuracion.permitirRegistro as any;
      }
    )
  }
  guardar() {
  let configuracion = {permitirRegistro:this.permitirRegistro};
  this.configuracionServicio.modificacionConfiguracion(configuracion);
  this.router.navigate(['/']);
  }
  eliminar() {

  }
}
