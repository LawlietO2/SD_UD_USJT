import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


export interface paciente {
  nome: string;
  posicao: number; //Mudarpaciente
}

const ELEMENT_DATA: paciente[] = [

];

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  nome : string = "";
  posicao : string = "";
  id: number = 0;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog : MatDialog,
    private api : ApiService,
    private route: ActivatedRoute) {

      console.log('Called Constructor');
      this.route.queryParams.subscribe(params => {
          this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.getPosicaoPaciente(this.id);
  }

  getPosicaoPaciente(id : number){
    this.api.getPosicaoPaciente(id)
   .subscribe({
     next: (res) => {

      this.dataSource = res.result;
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.nome = res.result[0].nome;
      this.posicao = res.result[0].queueId;
     },
     error: (err) => {
       alert("Error while fetching the Records")
     }
   })
 }

}
