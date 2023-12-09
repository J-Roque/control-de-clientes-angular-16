import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { LoginComponent } from './components/login/login.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EditarClientComponent } from './components/editar-client/editar-client.component';
import { AuthGuard } from './guardianes/auth.guard';
import { ConfiguracionGuard } from './guardianes/configuracion.guard';
const routes: Routes = [
  {path :'',component:ClientesComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent,canActivate:[ConfiguracionGuard]},
  {path:'configuracion',component:ConfiguracionComponent,canActivate:[AuthGuard]},
  {path:'cliente/editar/:id',component:EditarClientComponent,canActivate:[AuthGuard]},
  {path:'**',component:NoEncontradoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
