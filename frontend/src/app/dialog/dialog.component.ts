import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  listaPrioridade = ["Não Urgente", "Pouco Urgente", "Urgente", "Emergência"];
  pacienteForm !: FormGroup;  
  constructor(
    private formBuilder : FormBuilder, 
    private api : ApiService, 
    private dialogRef : MatDialogRef<DialogComponent>){

  }

  ngOnInit(): void {
    this.pacienteForm = this.formBuilder.group({
      nome : ['',Validators.required],
      prioridade : ['',Validators.required]
    })
  }
  addPaciente(){
    if(this.pacienteForm.valid){
      this.api.postPaciente(this.pacienteForm.value)    
      .subscribe({
        next:(res)=>{
          alert("Paciente adicionado");
          console.log(this.pacienteForm.value)
          this.pacienteForm.reset();
          this.dialogRef.close();
        },
        error:()=>{
          alert("Erro")
        }
      })
    }
  }

}
