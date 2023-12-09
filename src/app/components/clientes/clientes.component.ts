import { Component, OnInit,ViewChild } from '@angular/core';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/modelo/cliente.model';
// import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }
  miTitulo = 'Control De Clientes';
  public formLogin: FormGroup;

  modal: string = 'hidden';
  constructor(
    private clientesServicios: ClienteServicio,
    private _formBuilder: FormBuilder) {
    this.crearForm();
  }

  ngOnInit() {
    this.clientesServicios.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;

      })

  }


  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clientes) {
      this.clientes.forEach(cliente => {
        saldoTotal += Number(cliente.saldo);
      })
    }
    return saldoTotal;
  }


  showModal() {
    if (this.modal == 'hidden') {
      this.modal = ''
    } else this.modal = 'hidden';
  }

  get nombreNoValido() {
    return this.formLogin.get('nombre')?.invalid && this.formLogin.get('nombre')?.touched;
  }
  get apellidoNoValido() {
    return this.formLogin.get('apellido')?.invalid && this.formLogin.get('apellido')?.touched;
  }
  get saldoNoValido() {
    return this.formLogin.get('saldo')?.invalid && this.formLogin.get('saldo')?.touched;
  }
  get emailNoValido() {
    return this.formLogin.get('email')?.invalid && this.formLogin.get('email')?.touched;
  }

  crearForm() {
    this.formLogin = this._formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(6)]],
      apellido: ['', [Validators.required, Validators.minLength(6)]],
      saldo: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._$+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }
  resetForm() {
    this.formLogin.reset();
  }
  guardar({ value, valid }: { value: Cliente, valid: boolean }) {
    if (this.formLogin.invalid) {
      return Object.values(this.formLogin.controls).forEach(control => {
        control.markAllAsTouched();
      })
    } else {
      this.clientesServicios.agregarCliente(value);
      this.resetForm();
      this.cerrrarModal();
    }
  }
  private cerrrarModal() {
    this.modal = 'hidden'
  }

}


