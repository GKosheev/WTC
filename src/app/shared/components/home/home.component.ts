import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string
  token: boolean | undefined
  PROTECTED_URL = 'http://localhost:5000/api/test/protected'

  constructor(private http: HttpClient, private auth: AuthService) {
    this.message = 'You are not authorized'
    /*
    this.auth.isTokenStillValid().then(result => {
      this.token = result
    })
     */
  }

  ngOnInit(): void {
    this.http.get<any>(this.PROTECTED_URL).subscribe(
      res => this.message = res,
      err => console.log('error: ', err),
      () => console.log('completed'))
  }
}
