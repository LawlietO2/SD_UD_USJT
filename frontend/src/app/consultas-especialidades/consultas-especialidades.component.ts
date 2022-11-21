import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

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
  displayedColumns: string[] = ['nome', 'prioridade', 'especialidade', 'consulta_cod'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api : ApiService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.especialidade = params['especialidade'];
    });
   }

  ngOnInit(): void {
    this.getConsultasPorEspecialidade();
  }

  getConsultasPorEspecialidade(){
    this.api.getConsultasPorEspecialidade(this.especialidade)
   .subscribe({
     next: (res) => {
      console.log(res.result);
       this.dataSource = res.result;


       this.dataList = res.result;

       console.log("DATA LIST")
       console.log(this.dataList)


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
    //window.location.reload();
    this.atualizarStatusInicioDeAtendimento(this.consulta_cod)
  }

  atualizarStatusInicioDeAtendimento(consulta_cod : string){
    console.log(`CONSULTA_COD ${consulta_cod}`)
    this.api.atualizarStatusInicioDeAtendimento(consulta_cod)
   .subscribe({
     next: (res) => {
      console.log("RETORNO")
      console.log(res)
     },
     error: (err) => {
       alert("Error while fetching the Records")
     }
   })
  }

  atualizarStatusFimDeAtendimento(){
    this.api.atualizarStatusFimDeAtendimento(this.consulta_cod)
   .subscribe({
     next: (res) => {
        console.log("RETORNO")
     },
     error: (err) => {
       alert("Error while fetching the Records")
     }
   })
  }
}
