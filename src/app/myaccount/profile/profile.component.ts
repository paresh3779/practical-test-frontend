import { Component } from '@angular/core';
import { IUser } from '../../core/interfaces';
import { Permissions } from '../../core/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userDetails: IUser;
  permissions = Permissions;
  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
  }
}
