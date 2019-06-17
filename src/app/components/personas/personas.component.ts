import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonasService } from '../../services/personas.service';
import { PersonasModel } from '../../models/personas.model';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styles: []
})
export class PersonasComponent implements OnInit {

  personas: PersonasModel[];
  msgs: Message[] = [];
  

  constructor(private personasService: PersonasService,
              private confirmationService: ConfirmationService,
               ) {

    this.consultarPersonas();
  }

  ngOnInit() {
  }

  consultarPersonas() {
    this.personasService.consultaPersonas().subscribe((datos: PersonasModel[]) => {
      this.personas = datos;
    });
  }

  confirmarEliminar(idEliminar: string, idnombre: string) {
    console.log(idEliminar);
    this.confirmationService.confirm({
      message: `Esta seguro de eliminar a ${idnombre}?` ,
      accept: () => {

        this.personasService.eliminarUsuario(idEliminar).subscribe(data => {
          this.msgs = [];
          this.msgs.push({
            severity: 'success',
            summary: 'Informacion',
            detail: 'Registro eliminado con exito.'
          });

          this.consultarUsuarios();

        });

      }
    });
  }
  consultarUsuarios() {
    this.personasService.consultaPersonas().subscribe(datos => {
      this.personas = datos;
    });
  }



}
