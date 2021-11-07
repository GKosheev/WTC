import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { regExp } from "../../../shared/regExp/regExp";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MatDialog } from '@angular/material/dialog';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserRegister } from "../../../shared/interfaces/auth/user.register.interface";
import { DialogFirstAgreementComponent } from "../register dialog components/dialog-first-agreement/dialog-first-agreement.component";
import { DialogSecondAgreementComponent } from "../register dialog components/dialog-second-agreement/dialog-second-agreement.component";
import { DialogCovidAgreementComponent } from "../register dialog components/dialog-covid-agreement/dialog-covid-agreement.component";
import { AuthService } from "../../../core/services/auth/auth.service";
import { Router } from "@angular/router";
import { SnackbarService } from "../../../shared/services/snackbar/snackbar.service";
function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    // I think if statement is not necessary
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: false });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

function MustBeConfirmed() {
  return (formGroup: FormGroup) => {
    const conf1 = formGroup.controls['clubPolicy']
    const conf2 = formGroup.controls['privacyPolicy']
    const conf3 = formGroup.controls['covidPolicy']

    if (conf1.value !== 'Confirm') {
      conf1.setErrors({ MustBeConfirmed: false })
    } else if (conf2.value !== 'Confirm') {
      conf2.setErrors({ MustBeConfirmed: false })
    } else if (conf3.value !== 'Confirm') {
      conf3.setErrors({ MustBeConfirmed: false })
    } else {
      conf1.setErrors(null)
      conf2.setErrors(null)
      conf3.setErrors(null)
    }

  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false, showError: true }
  }]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;
  registerForm2: FormGroup | any;
  serverAction: boolean = false;

  passwordPattern = { hasUppercaseLetter: false, hasDigit: false, hasRequiredLength: false }

  onKeyPress(): void {
    setTimeout(() => this.checkPasswordPattern(), 250)
  }

  checkPasswordPattern(): void {
    let enteredPassword: string = this.registerForm.get('password').value

    this.passwordPattern = {
      hasUppercaseLetter: /(?=.*[A-Z])/.test(enteredPassword),
      hasDigit: /\d/.test(enteredPassword),
      hasRequiredLength: enteredPassword.length >= 8
    }
  }

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
  stepperOrientation: Observable<StepperOrientation>; // stepper


  constructor(private fb: FormBuilder,
    private observer: BreakpointObserver,
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private snackbar: SnackbarService) {
    this.stepperOrientation = observer.observe('(min-width: 959px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(regExp.email)]],
      registrationType: ['nonMember', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(regExp.password)]],
      confirmedPassword: ['', Validators.required],
      gender: ['unspecified'],
      dateOfBirth: ['', [Validators.required]],
      receiveClubEmails: false,
      securityQuestion: this.questionControl,
      securityAnswer: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required]],
      clubPolicy: '',
      privacyPolicy: '',
      covidPolicy: ''
    }, {
      validator: MustMatch('password', 'confirmedPassword')
    });

    this.registerForm2 = this.fb.group({
      clubPolicy: '',
      privacyPolicy: '',
      covidPolicy: ''
    }, {
      validator: MustBeConfirmed()
    })
    // this.registerForm.controls.registrationType.disable(); // Non-Member is constant value for new users


  }

  get f() {
    return this.registerForm.controls; // for easier access
  }

  get f2() {
    return this.registerForm2.controls;
  }




  openFirstAgreement() {
    const clubPolicy = this.dialog.open(DialogFirstAgreementComponent, {
      width: '600px'
    });

    clubPolicy.afterClosed().subscribe(result => {
      this.registerForm.controls['clubPolicy'].setValue(result)
      this.registerForm2.controls['clubPolicy'].setValue(result)
    });
  }

  openSecondAgreement() {
    const privacyPolicy = this.dialog.open(DialogSecondAgreementComponent, {
      width: '600px'
    });

    privacyPolicy.afterClosed().subscribe(result => {
      this.registerForm.controls['privacyPolicy'].setValue(result)
      this.registerForm2.controls['privacyPolicy'].setValue(result)
    })

  }

  openCovidAgreement() {
    const covidPolicy = this.dialog.open(DialogCovidAgreementComponent, {
      width: '600px'
    });
    covidPolicy.afterClosed().subscribe(result => {
      this.registerForm.controls['covidPolicy'].setValue(result)
      this.registerForm2.controls['covidPolicy'].setValue(result)
    })
  }

  agreementIsValid(): boolean {
    return this.f2['clubPolicy'].value === 'Confirm' && this.f2['privacyPolicy'].value === 'Confirm' &&
      this.f2['covidPolicy'].value === 'Confirm'
  }

  FirstAgreementResult(): boolean {
    return this.f2['clubPolicy'].value === 'Confirm'
  }
  SecondAgreementResult(): boolean {
    return this.f2['privacyPolicy'].value === 'Confirm'
  }
  CovidAgreementResult(): boolean {
    return this.f2['covidPolicy'].value === 'Confirm'
  }

  onSubmit(): void {
    this.serverAction = true;
    if (this.registerForm.invalid || !this.agreementIsValid())
      return;
    else {
      let userRegister: UserRegister = {
        profile: {
          firstName: this.registerForm.get('firstName').value,
          lastName: this.registerForm.get('lastName').value,
          email: this.registerForm.get('email').value,
          registrationType: this.registerForm.get('registrationType').value,
          phone: this.registerForm.get('phone').value,
          gender: this.registerForm.get('gender').value,
          dateOfBirth: this.registerForm.get('dateOfBirth').value,
          receiveClubEmails: this.registerForm.get('receiveClubEmails').value
        },
        password: this.registerForm.get('password').value,
        repeatPassword: this.registerForm.get('confirmedPassword').value,
        securityQuestion: this.registerForm.get('securityQuestion').value,
        securityAnswer: this.registerForm.get('securityAnswer').value,
        clubPolicy: this.registerForm.get('clubPolicy').value,
        privacyPolicy: this.registerForm.get('privacyPolicy').value,
        covidPolicy: this.registerForm.get('covidPolicy').value
      };
      this.auth.register(userRegister).subscribe((response) => {
        this.serverAction = false;
        if (response.msg)
          this.snackbar.openSnackBar(response.msg, false)
        this.router.navigate(['auth/login'])
      }, error => {
        this.serverAction = false;
        if (error.error.msg)
          this.snackbar.openSnackBar(error.error.msg, true)

        if (!error.error.userExists)
          this.router.navigate(['auth/login'])
      })
      //server-side email checking with further registration
    }
  }
}


