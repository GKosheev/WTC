import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import {User} from "../../../shared/interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit, OnInit {
  user: User | null = null
  firstName: string | undefined = undefined
  lastName: string | undefined = undefined

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver,
              private http: HttpClient,
              private auth: AuthService,
              private cd: ChangeDetectorRef) {}

  async ngOnInit() {
    this.auth.getUser().subscribe(user => {
      this.user = user
      this.firstName = user?.profile.firstName
      this.lastName = user?.profile.lastName
    })
    // async user load from Auth service
    // in order to change navbar if user isn't logged in
  }

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 959px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.cd.detectChanges()
  }

  logOut(): void {
    this.auth.logOut()
  }
}
