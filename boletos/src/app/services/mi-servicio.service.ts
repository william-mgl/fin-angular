import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiServicioService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  private url = "http://localhost:3000/api/usuario";

  constructor(
    private http: HttpClient
  ) { 

  }

  guardar_usuario(datos: any): Observable<any> {
    return this.http.post(this.url, datos, { headers: this.headers });
  }

  obtener_usuario_get(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminar_usuario(usuario_id: number): Observable<any> {
    return this.http.delete(`${this.url}`, {
      headers: this.headers,
      body: { usuario_id }  // Asegúrate de que el `usuario_id` esté en el cuerpo
    });
  }
  
  actualizar_usuario(datos: any): Observable<any> {
    return this.http.put(`${this.url}`, datos, { headers: this.headers });
  }
}
