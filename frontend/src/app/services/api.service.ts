import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postPaciente(data : any){
    return this.http.post<any>("http://localhost:3000/api/paciente",data)

  }
  getPacientes(){
    return this.http.get<any>("http://localhost:3000/api/pacientes/")
  }


  getPosicaoPaciente(id : number){
    let url = "http://localhost:4000/api/paciente/" + id;
    return this.http.get<any>(url)
  }
}
