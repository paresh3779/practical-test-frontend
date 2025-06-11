import { Component, OnInit } from '@angular/core';
import { IUser } from '../../core/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  userDetails: IUser;
  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
  }
}
