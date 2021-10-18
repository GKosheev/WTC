import {Component, OnInit} from '@angular/core';
import * as moment from "moment";


@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.scss']
})
export class CourtsComponent implements OnInit {
  indoor: string = ''
  outdoor: string = ''
  wall: string = ''

  date: string


  constructor() {
    this.date = moment().format("MM-DD-YYYY");
    this.routeDate(this.date)
  }

  routeDate(date: string): void {
    this.indoor = './indoor/' + date
    this.outdoor = './outdoor/' + date
    this.wall = './wall/' + date
  }


  ngOnInit(): void {

  }

}
