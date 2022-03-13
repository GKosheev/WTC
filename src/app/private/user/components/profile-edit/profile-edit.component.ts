import {Component, OnInit} from '@angular/core';
import {Profile} from "../../../../shared/interfaces/profile/profile.interface";
import {ProfileService} from "../../services/profiles/profile.service";
import {Router} from "@angular/router";
import {ProfileEdit} from "../../interfaces/profile-edit/ProfileEdit";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";
import {ChangeProfileImageComponent} from "../change-profile-image/change-profile-image.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  fullProfile: Profile = {} as Profile
  editProfile: ProfileEdit = {} as ProfileEdit
  firstName: string = '';
  lastName: string = '';
  twitter: string = '';
  instagram: string = '';
  facebook: string = '';


  constructor(private profileService: ProfileService,
              private router: Router,
              private _snackBar: SnackbarService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(userProfile => {
      if (userProfile !== undefined) {
        this.fullProfile = userProfile
        this.firstName = this.editProfile.firstName = userProfile.firstName
        this.lastName = this.editProfile.lastName = userProfile.lastName
        this.twitter = this.editProfile.twitter = userProfile.twitter
        this.instagram = this.editProfile.instagram = userProfile.instagram
        this.facebook = this.editProfile.facebook = userProfile.facebook
        this.editProfile.receiveClubEmails = userProfile.receiveClubEmails
        this.editProfile.shareMyEmail = userProfile.shareMyEmail
        this.editProfile.shareMyPhone = userProfile.shareMyPhone
        this.editProfile.img = userProfile.img
      }
    })
  }

  saveChanges(): void {
    //TODO validation if (profile === profile$), in order not to call post method if data hasn't been changed
    this.profileService.saveChanges(this.editProfile, this.profileService.id).subscribe(res => {
      if (res.msg)
        this._snackBar.openSnackBar(res.msg, false)
      return this.router.navigate(['private/user/profile'])
    }, error => {
      if (error.error.msg)
        this._snackBar.openSnackBar(error.error.msg, true)
      return;
    })
  }

  changeImage(): void {
    this.dialog.open(ChangeProfileImageComponent, {
      width: '400px'
    })
  }

}
