import { Component, OnInit } from '@angular/core';
import {Profile} from "../../../../shared/interfaces/profile/profile.interface";
import {ProfileService} from "../../services/profiles/profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile | undefined
  constructor(private profileService: ProfileService) {
    this.profileService.getUserProfile().subscribe(user => {
      this.profile = user
    })
  }

  ngOnInit(): void {
  }

}
