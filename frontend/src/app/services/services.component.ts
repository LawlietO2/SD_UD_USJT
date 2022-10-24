import { Component, Injector, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ServicesComponent implements OnInit {
  

  constructor() { }

  ngOnInit(): void {
  }

}
