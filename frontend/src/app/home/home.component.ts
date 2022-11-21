import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private api : ApiService) { }

  ngOnInit(): void {
    this.api.resetLoginConfigs().subscribe({
      next: (res) => {
       console.log(res);
      },
      error: (err) => {
        alert("Error while fetching the Records")
      }
    })
  }

  submitEntrar() {
    // redirecionar para tela de login
    this.router.navigate(['login'])
  }
}
