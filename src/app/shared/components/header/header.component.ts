import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;
  subscription: Subscription;
  constructor(
    private authService: AuthService,
    private route: Router
  ){}

  ngOnInit(){
    this.authService.isAuthenticated$.subscribe(result => {
      this.isAuthenticated = result;
    })
  }

  /** Logout process */
  logout() {
    this.subscription = this.authService.logout().subscribe(result => {
      if(result.success){
        this.route.navigate(["./auth/login"]);
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
