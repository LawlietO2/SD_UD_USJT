import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-consultas-especialidades',
  templateUrl: './consultas-especialidades.component.html',
  styleUrls: ['./consultas-especialidades.component.css']
})
export class ConsultasEspecialidadesComponent implements OnInit {
  especialidade : string = "";
  constructor(
    private api : ApiService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.especialidade = params['especialidade'];
    });
   }

  ngOnInit(): void {
  }

}
