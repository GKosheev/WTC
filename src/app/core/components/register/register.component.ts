import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {regExp} from "../../../shared/regExp/regExp";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatDialog} from '@angular/material/dialog';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {IUserRegister} from "../../../shared/interfaces/i-user-register";
import {DialogFirstAgreementComponent} from "../register dialog components/dialog-first-agreement/dialog-first-agreement.component";
import {DialogSecondAgreementComponent} from "../register dialog components/dialog-second-agreement/dialog-second-agreement.component";
import {DialogCovidAgreementComponent} from "../register dialog components/dialog-covid-agreement/dialog-covid-agreement.component";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";

function MustMatch(controlName: string, matchingControlName: string) {
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
  styleUrls: ['./register.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class RegisterComponent implements OnInit, AfterViewInit {
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
  stepperOrientation: Observable<StepperOrientation>; // stepper


  constructor(private fb: FormBuilder, private observer: BreakpointObserver, public dialog: MatDialog, private auth: AuthService, private router: Router) {
    this.stepperOrientation = observer.observe('(min-width: 800px')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'))
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

    // this.registerForm.controls.registrationType.disable(); // Non-Member is constant value for new users
  }

  ngAfterViewInit() {

  }

  get f() {
    return this.registerForm.controls; // for easier access
  }

  openFirstAgreement() {
    const clubPolicy = this.dialog.open(DialogFirstAgreementComponent, {
      width: '600px'
    });

    clubPolicy.afterClosed().subscribe(result => {
      this.registerForm.controls['clubPolicy'].setValue(result)
    });
  }

  openSecondAgreement() {
    const privacyPolicy = this.dialog.open(DialogSecondAgreementComponent, {
      width: '600px'
    });

    privacyPolicy.afterClosed().subscribe(result => {
      this.registerForm.controls['privacyPolicy'].setValue(result)
    })

  }

  openCovidAgreement() {
    const covidPolicy = this.dialog.open(DialogCovidAgreementComponent, {
      width: '600px'
    });
    covidPolicy.afterClosed().subscribe(result => {
      this.registerForm.controls['covidPolicy'].setValue(result)
    })
  }

  agreementIsValid(): boolean {
    return this.f['clubPolicy'].value === 'Confirm' && this.f['privacyPolicy'].value === 'Confirm' &&
      this.f['covidPolicy'].value === 'Confirm'
  }

errorMessage: string = ''
  onSubmit(): void {
    console.log(this.registerForm.value)
    //TODO if statement might not be important due to [disabled]="!registerForm.valid"  html (line 108)
    if (this.registerForm.invalid || !this.agreementIsValid()) {
      this.errorMessage = 'something went wrong'
      return;
    } else {
      let userRegister: IUserRegister = this.registerForm.value
      console.log("userRegister: "+ '\n' + JSON.stringify(userRegister))
      this.auth.register(userRegister).subscribe(() => {
        this.router.navigateByUrl('/')
      })
      //TODO server-side email checking with further registration
    }
  }
}


