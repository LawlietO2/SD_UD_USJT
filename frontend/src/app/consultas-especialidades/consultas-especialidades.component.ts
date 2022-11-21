import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultas-especialidades',
  templateUrl: './consultas-especialidades.component.html',
  styleUrls: ['./consultas-especialidades.component.css']
})
export class ConsultasEspecialidadesComponent implements OnInit {
  especialidade : string = "";
  nome : string = "";
  consulta_cod : string = "";
  dataList: any;
  displayedColumns: string[] = ['nome', 'consulta_cod'];
  dataSource!: MatTableDataSource<any>;
  pacienteForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api : ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder : FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.especialidade = params['especialidade'].split('\"').join("");
    });
   }

  ngOnInit(): void {
    this.pacienteForm = this.formBuilder.group({
      formsPaciente : ['',Validators.required]
    })
    if(this.especialidade){
      this.api.verificarLogin(this.especialidade).subscribe({
        next: (res) => {
          console.log(res)
          let status = res.result.status;
          if( status == "0"){
            this.router.navigate(['']);
            return;
          }
        },
        error: (err) => {
          alert("Error while fetching the Records")
        }
      })
    }
    else{
      this.router.navigate(['']);
      return;
    }

    this.getConsultasPorEspecialidade();
  }

  getConsultasPorEspecialidade(){
    this.api.getConsultasPorEspecialidade(this.especialidade)
   .subscribe({
     next: (res) => {
      console.log(res.result);
       console.log(this.dataSource)
        const length = 9 - res.result.length;
         for (let i = 0; i < length; i++) {

          res.result.push(Object.create(null));
         }
         this.dataSource = res.result;
       this.dataList = res.result;
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort
     },
     error: (err) => {
       alert("Error while fetching the Records")
     }
   })
 }

 chamarConsulta(){
    this.nome = this.dataList[0].nome;
    this.consulta_cod = this.dataList[0].consulta_cod;
    this.atualizarStatusInicioDeAtendimento(this.consulta_cod)
  }

  atualizarStatusInicioDeAtendimento(consulta_cod : string){
    this.api.atualizarStatusInicioDeAtendimento(consulta_cod)
   .subscribe({
     next: (res) => {
     },
     error: (err) => {
       alert("Error while fetching the Records")
     }
   })
  }

  // atualizarStatusFimDeAtendimento(){
  //   this.api.atualizarStatusFimDeAtendimento(this.consulta_cod)
  //  .subscribe({
  //    next: (res) => {
  //    },
  //    error: (err) => {
  //      alert("Error while fetching the Records")
  //    }
  //  })
  // }

  atualizar(){
   window.location.reload();
  }


  atualizarStatusFimDeAtendimento(){
    if(this.pacienteForm.valid){
      let json = {};
      let queixaPaciente = this.pacienteForm.value.formsPaciente;
      json = {
        consulta_cod: this.consulta_cod,
        queixa: queixaPaciente
      };

    this.api.atualizarStatusFimDeAtendimento(json)
   .subscribe({
     next: (res) => {
        console.log(res.result)
     },
     error: (err) => {
       alert("Error while fetching the Records")
     }
   })
  }
  window.location.reload();
}
}
