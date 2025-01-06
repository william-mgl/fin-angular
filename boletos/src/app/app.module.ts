import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { HomeComponent } from './components/home/home.component';
import { fromEvent } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MiServicioService } from './services/mi-servicio.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RutasComponent } from './components/rutas/rutas.component';
import { BusComponent } from './components/bus/bus.component';




@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    HomeComponent,
    RutasComponent,
    BusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [
    MiServicioService,
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
