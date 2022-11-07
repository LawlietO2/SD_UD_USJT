import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface pacientes {
  nome: string;
  data: Date; //Mudar para Date
  prioridade: string;
}

// teste

const ELEMENT_DATA: pacientes[] = [

];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'interface';
  displayedColumns: string[] = ['nome', 'prioridade'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog : MatDialog,
    private api : ApiService
    ){

  }
  ngOnInit(): void {
    this.getPacientes();;
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }

  getPacientes(){
     this.api.getPacientes()
    .subscribe({
      next: (res) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        console.log(this.dataSource)
        this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort
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