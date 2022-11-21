import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status : number = 0;
  loginForm!: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private api : ApiService,
    private router: Router){
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login : ['',Validators.required],
      senha : ['',Validators.required]
    })
  }

  submitLogin(){
    if(this.loginForm.valid){
      let json = {};
      let senhawrk = this.loginForm.value.senha;
      var encrypted = this.api.encodepass('77qte87gybv', senhawrk);

      json = {
        login: this.loginForm.value.login,
        senha: encrypted
      };

      this.api.login(json)
      .subscribe({
        next:(res)=>{
          if(res.result.status == 1){
            let especialidade_rsl = res.result.especialidade;
            if(especialidade_rsl == "Atendente"){
              this.router.navigate(['lista']);
            }
            this.status = 1;
            this.router.navigate(['especialidades'],{ queryParams: { especialidade: res.result.especialidade }});
          }
          else
            this.status = 2;
          this.loginForm.reset()
        },
        error:()=>{
          alert("Erro")
        }
      })
    }
  }
}
