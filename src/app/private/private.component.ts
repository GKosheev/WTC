import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../shared/interfaces/user.interface";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../core/services/auth/auth.service";
import {Router} from "@angular/router";
import {PaymentsService} from "./user/services/payments/payments.service";
import {Observable, of, Subscription} from "rxjs";
import {ShortPayment} from "./user/interfaces/payments/ShortPayment";

@Component({
  selector: 'private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements AfterViewInit, OnInit {
  user: User | null = null
  firstName: string | undefined = undefined
  lastName: string | undefined = undefined
  loadPayments$: Observable<ShortPayment[] | null> = of(null)
  allPayments$: Observable<ShortPayment[] | null> = of(null)

  /*
private userId$: Observable<string> = this.activatedRoute.params.pipe(
  map((params: Params) => params['userId'])
)
*/


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver,
              private http: HttpClient,
              private auth: AuthService,
              private cd: ChangeDetectorRef,
              private router: Router,
              private paymentsService: PaymentsService) {
  }

  async ngOnInit() {
    await this.auth.getUser().subscribe(user => {
      this.user = user
      this.firstName = user?.profile.firstName
      this.lastName = user?.profile.lastName
    })
    this.loadPayments$ = this.paymentsService.loadPayments()
    this.allPayments$ = this.paymentsService.getPayments()

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

  isMember(): boolean {
    if (this.user)
      return this.user.roles.indexOf('member') > -1
    else {
      this.logOut()
      return false;
    }
  }
}
