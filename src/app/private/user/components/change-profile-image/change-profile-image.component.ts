import {Component, EventEmitter, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profiles/profile.service";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";

@Component({
  selector: 'app-change-profile-image',
  templateUrl: './change-profile-image.component.html',
  styleUrls: ['./change-profile-image.component.scss']
})
export class ChangeProfileImageComponent implements OnInit {
  fileName = '';

  constructor(private profileService: ProfileService, private _snackBar: SnackbarService) {
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append("profile-image", file);

      this.profileService.uploadProfileImg(formData).subscribe(response => {
        if (response.msg) {
          this._snackBar.openSnackBar(response.msg, false)
          setTimeout(() => {
            window.location.reload()
          }, 1000)

        }
      }, error => {
        if (error.error.msg)
          this._snackBar.openSnackBar(error.error.msg, true)
      })
    }
  }

}
