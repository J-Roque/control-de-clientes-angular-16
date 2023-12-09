import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Cliente } from "../modelo/cliente.model";
import { Observable, map } from "rxjs";


@Injectable()
export class ClienteServicio {
    clientesColleccion!: AngularFirestoreCollection<Cliente>;
    clienteDoc!: AngularFirestoreDocument<Cliente>;
    clientes!: Observable<Cliente[]>;
    cliente!: Observable<Cliente>;
    clienteVacio: Cliente = {
        nombre: 'errr',
        apellido: 'errr',
        email: 'errr',
        saldo: 404
      }


    constructor(private db: AngularFirestore) {
        this.clientesColleccion = db.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
    }
    getClientes(): Observable<Cliente[]> {
        this.clientes = this.clientesColleccion.snapshotChanges().pipe(
            map(cambios => {
                return cambios.map(accion => {
                    const datos = accion.payload.doc.data() as Cliente;
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.clientes;
    }
    agregarCliente(cliente: Cliente) {
        this.clientesColleccion.add(cliente);
    }

    getCliente(id: string): Observable<Cliente> {
        this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
        return this.cliente = this.clienteDoc.snapshotChanges().pipe(
            map(accion => {
                if (accion.payload.exists === false) {
                    return null;
                } else {
                    const datos = accion.payload.data() as Cliente;
                    datos.id = accion.payload.id;
                    return datos as any;
                }
            })
        );

    }

     modificarCliente(cliente: Cliente) {
        this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
        this.clienteDoc.update(cliente);
        console.log(this.clienteDoc);

    }
    eliminarCliente(cliente:Cliente){
        this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
        this.clienteDoc.delete();

    }
    
 }

   
