import { Router } from "@angular/router";
import { ConfiguracionServicio } from "../servicios/configuracion.service";
import { Injectable } from "@angular/core";
import {  map } from "rxjs";
import { CanActivateFn } from "@angular/router";
@Injectable()
export class ConfiguracionGuard {
    constructor(
        private router:Router,
        private configuracionServicio:ConfiguracionServicio,
    ){}

    canActivate(){
        return this.configuracionServicio.getConfiguracion().pipe(
            map( configuracion => {
                if(configuracion.permitirRegistro){
                    return true;
                }else{
                    this.router.navigate(['/login']);
                    return false;
                }
                
            })
        );
    }
}