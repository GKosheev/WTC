import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import {Player} from "../../../shared/interfaces/player";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit, OnInit {
  player: Player | undefined = {} as Player

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver) {

  }

  async ngOnInit() {
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
  }
}
