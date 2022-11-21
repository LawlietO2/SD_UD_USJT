import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

export interface pacientes {
  nome: string;
  data: Date; //Mudar para Date
  prioridade: string;
  especialidade: string;
  consulta_cod: string;
}

const ELEMENT_DATA: pacientes[] = [

];

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})

export class ListaComponent implements OnInit {
  title = 'interface';
  especialidade : string = "";
  displayedColumns: string[] = ['nome', 'prioridade', 'especialidade', 'consulta_cod'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog : MatDialog,
    private api : ApiService,
    private router: Router,
    private route: ActivatedRoute
    ){

      this.route.queryParams.subscribe(params => {
        this.especialidade = params['especialidade'];
      });

  }
  ngOnInit(): void {
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

    this.getPacientes();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }

  gotoConsultaPosicao(){
    this.router.navigate(['consulta']);
   }

  getPacientes(){
     this.api.getPacientes()
    .subscribe({
      next: (res) => {
        this.dataSource = res.result;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error: (err) => {
        alert("Error while fetching the Records")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
