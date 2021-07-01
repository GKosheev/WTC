import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router) {
    this.username = ''
    this.password = ''
  }

  ngOnInit(): void {
  }

}
