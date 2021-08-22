import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {UserProfile} from "../../../shared/interfaces/table/user.profile.interface";
import {TableService} from "../../../shared/services/player list/table.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private userId$: Observable<string> = this.activatedRoute.params.pipe(
    map((params: Params) => params['id'])
  )
  user$: Observable<UserProfile> = this.userId$.pipe(
    switchMap((userId: string) => this.tableService.loadUserData(userId))
  )
  twitterValid = false;
  instagramValid = false;
  facebookValid = false;

  constructor(private activatedRoute: ActivatedRoute, private tableService: TableService) {
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.twitterValid = this.twitter(user.twitter)
      this.instagramValid = this.facebook(user.facebook)
      this.facebookValid = this.instagram(user.instagram)
    })
  }

  twitter(link: string): boolean {
    // TODO twitter regExp
    return false;
  }

  instagram(link: string): boolean {
    // TODO instagram regExp
    return false;
  }

  facebook(link: string): boolean {
    // TODO facebook regExp
    return false;
  }
}
