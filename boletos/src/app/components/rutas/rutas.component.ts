import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MiServicioRutasService } from '../../services/mi-servicio-rutas.service';
import moment from 'moment';

@Component({
  selector: 'app-rutas',
  standalone: false,
  
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.scss'
})

export class RutasComponent implements OnInit {
  title = 'Boleteria';
  profileForm!: FormGroup;
  rutasForm!: FormGroup;
  objeto: any = [];
  objeto_tabla: any = [];
  graba:String = "S";

  constructor(
    private fb: FormBuilder,
    private miServicio: MiServicioRutasService
  ) { 

    this.rutasForm = this.fb.group({
      ruta_id: [-1], 
      origen: ["", [Validators.required]], 
      destino: ["", [Validators.required]], 
      duracion: ["", [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]], // Validación para duración como un número decimal válido
      precio: ["", [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]] // Validación para precio como un número decimal válido
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

    this.miServicio.obtener_rutas().subscribe(
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

    console.table(this.objeto);
    localStorage.setItem("base_nueva", JSON.stringify(this.objeto));
  }

  guardar_rutas() {
  
    if(this.rutasForm.value.ruta_id === -1) {
   
    this.miServicio.guardar_rutas(this.rutasForm.value).subscribe(
      (resp) => {
        console.log('Ruta guardado:', resp);
        this.ngOnInit();
        this.graba = "S";
        alert('Ruta guardada con éxito!');
        this.rutasForm.reset();
      },
      (err: any) => {
        console.error('Error al guardar ruta:', err);
        alert('Hubo un error al guardar la ruta. Intenta nuevamente.');
        this.rutasForm.reset();
      }
    );
  } else {
    this.miServicio.actualizar_rutas(this.rutasForm.value).subscribe(
      (resp) => {
        console.log('Ruta actualizado:', resp);
        this.ngOnInit();
        this.graba = "S";
        alert('Ruta actualizada con éxito!');
        this.rutasForm.reset();
      },
      (err: any) => {
        console.error('Error al actualizar ruta:', err);
        alert('Hubo un error al actualizar la ruta. Intenta nuevamente.');
        this.rutasForm.reset();
      }
    );
  }
  }

  eliminar_rutas(item: any) {
    if (!item || !item.ruta_id) {
      console.warn('El ID del ruta es necesario para eliminarlo.');
      alert('El ID del ruta es necesario para eliminarlo.');
      return;
    }
  
    this.miServicio.eliminar_rutas(item.ruta_id).subscribe(
      (resp) => {
        console.log('ruta eliminado:', resp);
        if (resp.status) {
          this.ngOnInit();
          alert('ruta eliminado con éxito!');
        } else {
          alert(resp.message || 'Error al eliminar el ruta.');
        }
      },
      (err: any) => {
        console.error('Error al eliminar ruta:', err);
        alert('Hubo un error al eliminar el ruta. Intenta nuevamente.');
      }
    );
  }

  cargardatos(item: any) {
    console.log(item);
    this.rutasForm = this.fb.group({
      ruta_id: [item.ruta_id],
      origen: [item.origen, Validators.required],
      destino: [item.destino, Validators.required],
      duracion: [item.duracion, [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]], 
      precio: [item.precio, [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]] 
    });
    this.graba = "N";
}

}
