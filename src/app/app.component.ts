import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

export interface pacientes {
  nome: string;
  sobrenome: string;
  sexo: string;
  dataNasc: string; //Mudar para Date
  prioridade: string;
  tempoEspera: Number;
}

const ELEMENT_DATA: pacientes[] = [
  {prioridade: 'Emergência', tempoEspera: 1, nome: 'Bartolomeu', sobrenome: 'Simpson', sexo: 'M', dataNasc: '15/04/1988'},
  {prioridade: 'Não Urgente', tempoEspera: 45, nome: 'Homero', sobrenome: 'Simpson', sexo: 'M', dataNasc: '11/01/1964'},
  {prioridade: 'Não Urgente', tempoEspera: 34, nome: 'Clark', sobrenome: 'Kent', sexo: 'M', dataNasc: '03/10/1952'},
  {prioridade: 'Não Urgente', tempoEspera: 27, nome: 'Bruce', sobrenome: 'Wayne', sexo: 'M', dataNasc: '27/07/1976'},
  {prioridade: 'Não Urgente', tempoEspera: 25, nome: 'Neymar', sobrenome: 'Jr.', sexo: 'M', dataNasc: '04/04/1989'}
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

  displayedColumns: string[] = ['prioridade', 'tempoEspera', 'nome', 'sobrenome', 'sexo', 'dataNasc'];
  dataSource = ELEMENT_DATA;
  
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }
}