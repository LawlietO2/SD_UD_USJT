import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  listaPrioridade = ["Não Urgente", "Pouco Urgente", "Urgente", "Emergência"];
  pacienteForm !: FormGroup;  
  constructor(private formBuilder : FormBuilder){

  }

  ngOnInit(): void {
    this.pacienteForm = this.formBuilder.group({
      nome : ['',Validators.required],
      sobrenome : ['',Validators.required],
      sexo : ['',Validators.required],
      dataNasc : ['',Validators.required],
      prioridade : [''],
    })
  }

}
