import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { map, Observable } from 'rxjs';
const PORT_ESPECIALIDADES = "7000";
const PORT_PACIENTES = "3000";
const PORT_LOGIN = "4100";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  downloadPDF(url: string): Observable<Blob> {
    const options = { responseType: 'blob' as 'json' };
    return this.http
   .get<Blob>(url, options)
   .pipe(map((res : any) => new Blob([res], { type: 'application/pdf' })));
 }

  verificarLogin(especialidade : any){
    let url = "http://localhost:" + PORT_LOGIN + "/api/verificar-login/" + "\"" + especialidade + "\"";
    return this.http.get<any>(url)
  }

  resetLoginConfigs(){
    let url = "http://localhost:" + PORT_LOGIN + "/api/resetLoginConfigs";
    return this.http.get<any>(url)
  }

  setLogin(especialidade : any){
    let url = "http://localhost:" + PORT_LOGIN + "/api/set-login/" + "\"" + especialidade + "\"";
    console.log(url)
    return this.http.get<any>(url)
  }

  postPaciente(data : any){
    return this.http.post<any>("http://localhost:" + PORT_PACIENTES + "/api/paciente",data)
  }

  login(data : any){
    return this.http.post<any>("http://localhost:" + PORT_LOGIN + "/api/login",data)
  }

  getPacientes(){
    return this.http.get<any>("http://localhost:" + PORT_PACIENTES + "/api/pacientes/")
  }

  getPosicaoPaciente(id : number){
    let url = "http://localhost:" + PORT_PACIENTES + "/api/pacientes/" + id;
    console.log(url)
    return this.http.get<any>(url)
  }

  getConsultasPorEspecialidade(especialidade : string){
    let url = "http://localhost:" + PORT_ESPECIALIDADES +"/api/consultas-especialidade/" + especialidade;
    return this.http.get<any>(url)
  }

  atualizarStatusInicioDeAtendimento(cod_consulta : string){
    let url = "http://localhost:" + PORT_ESPECIALIDADES + "/api/inicio-consulta/" + cod_consulta;
    return this.http.get<any>(url)
  }

  atualizarStatusFimDeAtendimento(data : any){
    let url = "http://localhost:" + PORT_ESPECIALIDADES + "/api/fim-consulta/";
    return this.http.post<any>(url, data)

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

