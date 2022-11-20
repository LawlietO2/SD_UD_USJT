import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './consulta/consulta.component';
import { HomeComponent } from './home/home.component';
import { ListaComponent } from './lista/lista.component';
import { LoginComponent } from './login/login.component';
import { ConsultasEspecialidadesComponent } from './consultas-especialidades/consulta';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', component: ListaComponent },
  { path: 'consulta', component: ConsultaComponent},
  { path: 'login', component: LoginComponent},
  { path: 'especialidades', component: ConsultasEspecialidadesComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
