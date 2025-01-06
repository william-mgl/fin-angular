import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MiServicioService } from '../../services/mi-servicio.service';
import moment from 'moment';

@Component({
  selector: 'app-usuario',
  standalone: false,
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  title = 'Boleteria';
  profileForm!: FormGroup;
  usuarioForm!: FormGroup;
  objeto: any = [];
  objeto_tabla: any = [];
  graba:String = "S";

  constructor(
    private fb: FormBuilder,
    private miServicio: MiServicioService
  ) { 
    this.profileForm = this.fb.group({
      usuario: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });

    this.usuarioForm = this.fb.group({
      usuario_id: [-1],
      nombre: ["", Validators.required],
      apellido1: ["", Validators.required],
      apellido2: ["", Validators.required],
      correo: ["", [Validators.required, Validators.email]],
      telefono: ["", [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
    console.log("Te amo");
  }
  
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      let data_nueva = localStorage.getItem("base_nueva");
      if (data_nueva) {
        this.objeto = JSON.parse(data_nueva);
      }
    } else {
      console.warn('localStorage no está disponible en este entorno');
    }

    this.miServicio.obtener_usuario_get().subscribe(
      (resp) => {
        console.table(resp); 
        this.objeto_tabla = resp;
      },
      (err) => {
        console.error('Error al obtener los usuarios:', err);
      }
    );    
  }

  onSubmit() {
    console.warn(this.profileForm.value);
    console.warn(moment().format("DD/MM/YYYY HH:mm:ss"));

    this.objeto.unshift({
      usuario: this.profileForm.value.usuario,
      password: this.profileForm.value.password,
      fecha: moment().format("DD/MM/YYYY HH:mm:ss")
    });

    console.table(this.objeto);
    localStorage.setItem("base_nueva", JSON.stringify(this.objeto));
  }

  guardar_usuario() {
  
    if(this.usuarioForm.value.usuario_id === -1) {
   
    this.miServicio.guardar_usuario(this.usuarioForm.value).subscribe(
      (resp) => {
        console.log('Usuario guardado:', resp);
        this.ngOnInit();
        this.graba = "S";
        alert('Usuario guardado con éxito!');
        this.usuarioForm.reset();
      },
      (err: any) => {
        console.error('Error al guardar usuario:', err);
        alert('Hubo un error al guardar el usuario. Intenta nuevamente.');
        this.usuarioForm.reset();
      }
    );
  } else {
    this.miServicio.actualizar_usuario(this.usuarioForm.value).subscribe(
      (resp) => {
        console.log('Usuario actualizado:', resp);
        this.ngOnInit();
        this.graba = "S";
        alert('Usuario actualizado con éxito!');
        this.usuarioForm.reset();
      },
      (err: any) => {
        console.error('Error al actualizar usuario:', err);
        alert('Hubo un error al actualizar el usuario. Intenta nuevamente.');
        this.usuarioForm.reset();
      }
    );
  }
  }

  eliminar_usuario(item: any) {
    if (!item || !item.usuario_id) {
      console.warn('El ID del usuario es necesario para eliminarlo.');
      alert('El ID del usuario es necesario para eliminarlo.');
      return;
    }
  
    this.miServicio.eliminar_usuario(item.usuario_id).subscribe(
      (resp) => {
        console.log('Usuario eliminado:', resp);
        if (resp.status) {
          this.ngOnInit();
          alert('Usuario eliminado con éxito!');
        } else {
          alert(resp.message || 'Error al eliminar el usuario.');
        }
      },
      (err: any) => {
        console.error('Error al eliminar usuario:', err);
        alert('Hubo un error al eliminar el usuario. Intenta nuevamente.');
      }
    );
  }

  cargardatos(item: any) {
    console.log(item);
    this.usuarioForm = this.fb.group({
      usuario_id: [item.usuario_id],
      nombre: [item.nombre, Validators.required],
      apellido1: [item.apellido1, Validators.required],
      apellido2: [item.apellido2, Validators.required],
      correo: [item.correo, [Validators.required, Validators.email]],
      telefono: [item.telefono, [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
    this.graba = "N";
}
}
