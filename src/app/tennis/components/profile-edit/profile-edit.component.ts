import {Component, OnInit} from '@angular/core';
import {IProfile} from "../../../shared/interfaces/iprofile";
import {ProfileService} from "../../../shared/services/profiles/profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  profile: IProfile = {} as IProfile
  firstName: string = '';
  lastName: string = '';
  twitter: string = '';
  instagram: string = '';
  facebook: string = '';
  constructor(private profileService: ProfileService, private router: Router) {

  }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(user => {
      if (user !== undefined) {
        this.profile = user
        this.firstName = this.profile.firstName
        this.lastName = this.profile.lastName
        this.twitter = this.profile.twitter
        this.instagram = this.profile.instagram
        this.facebook = this.profile.facebook
      }
    })
  }

  saveChanges(): void {
    // TODO validation if (profile === profile$), in order not to call post method if data hasn't been changed
    this.profileService.saveChanges(this.profile, this.profileService.id).subscribe(data =>{
      return this.router.navigateByUrl('/profile')
    })
  }
}
