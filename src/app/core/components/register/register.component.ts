import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {regExp} from "../../../shared/regExp/regExp";

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    // TODO I think if statement is not necessary
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: false});
    } else {
      matchingControl.setErrors(null);
    }
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;
  hidePass = true;
  hideConfPass = true;

  //security questions
  questions: string[] = [
    "What is your Mother's maiden name",
    "What City or Town where you born in?",
    "What was the name of your first pet?",
    "What is your favorite vegetable?",
    "What is your favorite movie?"
  ]

  questionControl = new FormControl('', Validators.required)

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(regExp.email)]],
      registrationType: ['nonMember'],
      password: ['', [Validators.required, Validators.pattern(regExp.password)]],
      confirmedPassword: ['', Validators.required],
      gender: ['unspecified'],
      dateOfBirth: ['',
        {
          validators: [Validators.required],
          updateOn: 'blur'
        }],
      receiveClubEmails: false,
      securityQuestion: this.questionControl,
      securityAnswer: ['', [Validators.required, Validators.minLength(4)]]
    }, {
      validator: MustMatch('password', 'confirmedPassword'),
    });

    this.registerForm.controls.registrationType.disable(); // Non-Member is constant value for new users
  }

  get f() {
    return this.registerForm.controls; // for easier access
  }


  onSubmit(): void {
    //TODO if statement might not be important due to [disabled]="!registerForm.valid"  html (line 108)
    if (this.registerForm.invalid) {
      return;
    }
    else {
      //TODO server-side email checking with further registration
    }
  }
}


