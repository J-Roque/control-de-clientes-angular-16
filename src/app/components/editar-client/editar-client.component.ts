import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-client',
  templateUrl: './editar-client.component.html',
  styleUrls: ['./editar-client.component.css']
})
export class EditarClientComponent {
  miTitulo='Editar Registro';
  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }
  title :string='Editar Cliente'
  id: string;
  constructor(
    private clientesServicios: ClienteServicio,
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    this.crearForm();
  }
  public formEditar: FormGroup;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientesServicios.getCliente(this.id).subscribe(cliente => {
      this.cliente = cliente;
      this.formEditar.patchValue(cliente);
    });
  }


  get nombreNoValido() {
    return this.formEditar.get('nombre')?.invalid && this.formEditar.get('nombre')?.touched;
  }
  get apellidoNoValido() {
    return this.formEditar.get('apellido')?.invalid && this.formEditar.get('apellido')?.touched;
  }
  get saldoNoValido() {
    return this.formEditar.get('saldo')?.invalid && this.formEditar.get('saldo')?.touched;
  }
  get emailNoValido() {
    return this.formEditar.get('email')?.invalid && this.formEditar.get('email')?.touched;
  }

  crearForm() {
    this.formEditar = this._formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      saldo: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._$+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }
  resetForm() {
    this.formEditar.reset();
  }
  // 
  guardar({ value, valid }: { value: Cliente, valid: boolean }) {

    if (this.formEditar.invalid) {
      return Object.values(this.formEditar.controls).forEach(control => {
        control.markAllAsTouched();
      })
    } else {
      value.id = this.id
      this.clientesServicios.modificarCliente(value);
      this.router.navigate(['/']);
      this.resetForm();
    }
  }
  eliminar() {
    if (confirm('¿Seguro que desea eliminar el cliente?')) {
      this.clientesServicios.eliminarCliente(this.cliente);
      this.router.navigate(['/']);

    }
  }
}
