import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Messages } from '../../core/constants';
import { emailValidator, phoneValidator, passwordValidator, passwordMatchValidator } from '../../core/helpers';
import { IUserRequest, IUserResponse } from '../../core/interfaces';
import { UserService } from '../../core/services/user.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent implements OnInit {

  registerForm!: FormGroup;
  registerLoader = false;
  submitted = false;
  showSuccess = false;
  userRequestData!: IUserRequest;
  errorMessages = Messages.registerPage.errorMessages;
  successMessages = Messages.registerPage.successMessages;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ){

  }

  ngOnInit() {
    this.registerFormInit();
  }

  /** Initialize register form */
  registerFormInit() {
    this.registerForm = this.fb.group({
        first_name: ["", [Validators.required]],
        last_name: ["", [Validators.required]],
        email: ["", [Validators.required, emailValidator]],
        phone_number: ["", [Validators.required, phoneValidator]],
        password: ["", [Validators.required, passwordValidator]],
        repeat_password: ["", [Validators.required]],
      },
      { validators: passwordMatchValidator() }
    )
  }

  /** Return register form controls */
  get userMeta() {
        return this.registerForm.controls;
    }

    /** User registartion form submission process */
    register() {
        this.submitted = true;
        this.showSuccess = false;
        if (this.registerForm.valid) {
            this.userRequestData = this.registerForm.getRawValue();
            if(this.registerLoader){
              return;
            }
            this.registerLoader = true;
            this.userService.userRegister(this.userRequestData).subscribe((response: IUserResponse) => {
              this.registerLoader = false;
              if(response.success){
                this.registerForm.reset();
                this.showSuccess = true;
                this.submitted = false;
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
            const formControl = this.registerForm.get(prop);
            if (formControl) {
                formControl.setErrors({
                    serverError: this.errorMessages[errors[prop][0]],
                });
            }
        });
    }

}
