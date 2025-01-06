import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { HomeComponent } from './components/home/home.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { BusComponent } from './components/bus/bus.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'rutas', component: RutasComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'autobuses', component: BusComponent },
  { path: '**', redirectTo: 'home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
