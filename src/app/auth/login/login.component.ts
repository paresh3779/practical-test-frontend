import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Messages } from '../../core/constants';
import { emailValidator, passwordValidator } from '../../core/helpers';
import { IUserLoginRequest } from '../../core/interfaces';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginLoader = false;
  submitted = false;
  loginRequestData!: IUserLoginRequest;
  errorMessages = Messages.registerPage.errorMessages;
  successMessages = Messages.registerPage.successMessages;
  subscription: Subscription;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ){

  }

  ngOnInit() {
    this.loginFormInit();
  }

  /** Initialize login form */
  loginFormInit() {
    this.loginForm = this.fb.group({
        email: ["", [Validators.required, emailValidator]],
        password: ["", [Validators.required, passwordValidator]],
      }
    )
  }

  /** Return login form controls */
  get loginMeta() {
        return this.loginForm.controls;
    }

    /** User login form submission process */
    login() {
        this.submitted = true;
        if (this.loginForm.valid) {
            this.loginRequestData = this.loginForm.getRawValue();
            if(this.loginLoader){
              return;
            }
            this.loginLoader = true;
            this.subscription = this.authService.login(this.loginRequestData).subscribe((response: any) => {
              this.loginLoader = false;
              if(response.success){
                this.submitted = false;
                this.route.navigate(['./']);
                
              }else {
                if(response.errors){
                  this.populateServerErrors(response.errors);
                }
              }
            })
        }
    }

    /** Populate serve side validations */
    populateServerErrors(errors: any) {
        Object.keys(errors).forEach((prop) => {
            const formControl = this.loginForm.get(prop);
            if (formControl) {
                formControl.setErrors({
                    serverError: this.errorMessages[errors[prop][0]],
                });
            }
        });
    }

    ngOnDestroy(){
      this.subscription?.unsubscribe();
    }
}
