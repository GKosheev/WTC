import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Profile} from "../../../shared/interfaces/profile/profile.interface";
import {ProfileService} from "../../../shared/services/profiles/profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile | undefined
  message = new FormControl('Your email will be added to the list of players');

  constructor(private profileService: ProfileService) {
    this.profileService.getUserProfile().subscribe(user => {
      this.profile = user
    })
  }

  ngOnInit(): void {
  }

}
