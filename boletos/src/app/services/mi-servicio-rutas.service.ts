import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MiServicioRutasService {     

    private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  
    private url = "http://localhost:3000/api/rutas";

  constructor(
    private http: HttpClient  
  ) { 

  }

  guardar_rutas(datos: any): Observable<any> {
    return this.http.post(this.url, datos, { headers: this.headers });
  }

  obtener_rutas(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminar_rutas(ruta_id: number): Observable<any> {
    return this.http.delete(`${this.url}`, {
      headers: this.headers,
      body: { ruta_id }  // Asegúrate de que el `usuario_id` esté en el cuerpo
    });
  }
  
  actualizar_rutas(datos: any): Observable<any> {
    return this.http.put(`${this.url}`, datos, { headers: this.headers });
  }
}
