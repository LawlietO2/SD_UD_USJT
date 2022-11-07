import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './consulta/consulta.component';
import { HomeComponent } from './home/home.component';
import { ListaComponent } from './lista/lista.component';


const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', component: ListaComponent },
  { path: 'consulta', component: ConsultaComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
