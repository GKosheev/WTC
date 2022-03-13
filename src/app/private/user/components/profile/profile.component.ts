import { Component, OnInit } from '@angular/core';
import {Profile} from "../../../../shared/interfaces/profile/profile.interface";
import {ProfileService} from "../../services/profiles/profile.service";
import * as moment from "moment";

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
      if (!this.profile)
        return;
      this.profile.dateOfBirth = moment(this.profile.dateOfBirth).format('MM-DD-YYYY')

    })
  }

  ngOnInit(): void {
  }

}
