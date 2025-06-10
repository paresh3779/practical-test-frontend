import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Messages } from '../../core/constants';
import { emailValidator, phoneValidator, passwordValidator, passwordMatchValidator } from '../../core/helpers';
@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  userData: any;
  errorMessages = Messages.registerPage.errorMessages;

  constructor(private fb: FormBuilder){
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

  ngOnInit() {

  }

  /** Return register form controls */
  get userMeta() {
        return this.registerForm.controls;
    }

    /** User registartion form submission process */
    register() {
        this.submitted = true;
        if (this.registerForm.valid) {
            this.userData = this.registerForm.getRawValue();
            console.log("userData: ", this.userData);
        } else {
        }
    }

}
