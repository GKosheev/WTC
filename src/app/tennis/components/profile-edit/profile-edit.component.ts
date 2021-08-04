import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {IProfile} from "../../../shared/interfaces/iprofile";
import {ProfileService} from "../../../shared/services/profiles/profile.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  receiveClubEmails = true;
  shareEmail = false;
  twitter = '-'
  instagram = '-'
  facebook = '-'
  userProfile: IProfile | null = null

  constructor(private router: Router, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(user => {
      this.userProfile = user
    })
  }
  saveChanges(): void{
    // TODO
    this.router.navigateByUrl('/profile')
  }
}
