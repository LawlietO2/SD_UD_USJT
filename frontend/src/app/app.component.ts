import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

export interface pacientes {
  nome: string;
  data: Date; //Mudar para Date
  prioridade: string;
}

const ELEMENT_DATA: pacientes[] = [

];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'interface';

  constructor(private dialog : MatDialog){

  }

  displayedColumns: string[] = ['prioridade', 'nome'];
  dataSource = ELEMENT_DATA;
  
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }
}