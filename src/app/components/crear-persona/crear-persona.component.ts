import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonasService } from '../../services/personas.service';

import { MessageService } from 'primeng/components/common/messageservice';
import { PersonasModel } from '../../models/personas.model';
import { Validaciones } from './validaciones';
import { Message } from 'primeng/components/common/message';


@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styles: []
})
export class CrearPersonaComponent implements OnInit {

  form: FormGroup;
  msgs: Message[] = [];
  verActualizar = false;
  estado: boolean;
  persona: PersonasModel;
  idPersona: string;

  constructor( private fb: FormBuilder,
               private personaService: PersonasService,
               private router: ActivatedRoute,
               private routerNav: Router ) {

this.form = this.fb.group({
  id: [null],
  nombre: ['',
  [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/)//solo letras
  ]],
  apellido: ['',
  [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/)//solo letras
  ]],
  email: ['@empresa.com',
  [
    Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)
  ]],
  ip: ['',
    [
      Validators.required,
      Validators.pattern(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/)
    ]
]

});

}

  ngOnInit() {

   }

   agregarAlCorreo(dato: any) {
    this.form.get('email').setValue(dato + '@gmail.com');
  }

   guardar() {
     let mensaje = '';

     if (this.form.invalid){
       this.msgs = [];
       this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Debes completar la informacion del formulario.' });

     } else {

      if (!this.persona) {
        this.persona = new PersonasModel();
      }

      this.persona.email = this.form.get('email').value;
      this.persona.nombre = this.form.get('nombre').value;
      this.persona.apellido = this.form.get('apellido').value;
      this.persona.ip = this.form.get('ip').value;

      if (this.idPersona) {

        this.personaService.actualizarUsuario(this.persona).subscribe(data =>{

          this.form.reset();
          mensaje = 'Registro actualizado con éxito';
          this.routerNav.navigate(['/listarPersonas', mensaje]);

        });

      } else {

        this.personaService.guardarUsuario(this.persona).subscribe(data =>{

          this.form.reset();
          mensaje = 'Registro almacenado con exito';
          this.routerNav.navigate(['/listarPersonas', mensaje]);

        });


      }
     }
   }


}
