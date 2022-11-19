import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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

  pacienteForm !: FormGroup;  
  nome : string = "";
  posicao : string = "";
  id: number = 0;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder : FormBuilder, 
    private dialog : MatDialog,
    private api : ApiService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.pacienteForm = this.formBuilder.group({
      Cod : '',
    })
    
  }
  
   
  
  getPosicaoPaciente(){
    
    this.id = this.pacienteForm.value.Cod;
  
    let url = new URL('http://localhost:4200/consulta?');
    let params = new URLSearchParams(url.search);

    // Add a third parameter.
    params.set('id', this.id.toString());
    window.history.pushState('new','title',url.toString() + params.toString())

    this.api.getPosicaoPaciente(this.id)
    .subscribe({
     next: (res) => {
  
      this.dataSource = res.result;
  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.nome = res.result.nome;
      this.posicao = res.result.queueId;
     },
     error: (err) => {
       alert("Error while fetching the Records")
     }
   })
 }
 
}
