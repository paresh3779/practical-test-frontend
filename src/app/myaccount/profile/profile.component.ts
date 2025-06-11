import { Component } from '@angular/core';
import { IUser } from '../../core/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userDetails: IUser;
  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
  }
}
