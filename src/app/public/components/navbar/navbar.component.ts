import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {User} from "../../../shared/interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../core/services/auth/auth.service";
import {Router} from "@angular/router";

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
              private cd: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit() {
    this.auth.getUser().subscribe(user => {
      this.user = user
      this.firstName = user?.profile.firstName
      this.lastName = user?.profile.lastName
    })
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
    this.router.navigateByUrl('auth/login')
  }
}
