import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  receiveClubEmails = true;
  shareEmail = false;
  message = new FormControl('Your email will be added to the list of players');

  constructor() { }

  ngOnInit(): void {
  }

}
