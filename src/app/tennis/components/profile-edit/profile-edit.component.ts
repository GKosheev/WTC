import { Component, OnInit } from '@angular/core';
import {IProfile} from "../../../shared/interfaces/iprofile";
import {ProfileService} from "../../../shared/services/profiles/profile.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  profile: IProfile = {} as IProfile

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(user => {
      if (user !== undefined) {
        this.profile = user
      }
    })
  }
  saveChanges(): void{
   // console.log("changed data: " + JSON.stringify(this.profile))
    this.profileService.saveChanges(this.profile)
  }
}
