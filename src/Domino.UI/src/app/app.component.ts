import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { baseUrl } from './app.config';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Dom-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}