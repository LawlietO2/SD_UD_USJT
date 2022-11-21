import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postPaciente(data : any){
    return this.http.post<any>("http://localhost:3000/api/paciente",data)
  }

  login(data : any){
    return this.http.post<any>("http://localhost:4100/api/login",data)
  }

  getPacientes(){
    return this.http.get<any>("http://localhost:3000/api/pacientes/")
  }

  getPosicaoPaciente(id : number){
    let url = "http://localhost:4000/api/paciente/" + id;
    return this.http.get<any>(url)
  }

  getConsultasPorEspecialidade(especialidade : string){
    let url = "http://localhost:7000/api/consultas-especialidade/" + especialidade;
    return this.http.get<any>(url)
  }

  atualizarStatusInicioDeAtendimento(cod_consulta : string){
    let url = "http://localhost:7000/api/fim-consulta/" + cod_consulta;
    return this.http.get<any>(url)
  }

  atualizarStatusFimDeAtendimento(cod_consulta : string){
    let url = "http://localhost:7000/api/inicio-consulta/" + cod_consulta;
    return this.http.get<any>(url)
  }

  encodepass(keys: string, value:string){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }
}

