import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import * as moment from "moment";
import {FormControl} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

export interface Court {
  date: Date,
  id: number,
  time: Date
}


@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.scss']
})
export class CourtComponent implements OnInit {
  columns = ["court1", "court2", "court3", "court4", "court5", "court6"];
  data: any[] = [10, 20, 30, 40, 50, 60];

  selectedDate: string | null = null

  booked: boolean = false;
  court$: Observable<string> = this.route.params.pipe(
    map((params: Params) => params['court'])
  )
  today: Date
  todayMoment: string
  maxDayMoment: string

  constructor(private route: ActivatedRoute) {
    this.today = new Date()
    this.todayMoment = moment(this.today).subtract(1, 'days').format('MM-DD-YYYY')
    this.maxDayMoment = moment(this.today.setDate(this.today.getDate() + 8)).format('MM-DD-YYYY')
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = moment(event.value).format("MM-DD-YYYY");
   // console.log("SelectedDate: " + this.selectedDate)
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getTime()
    return moment(day).isAfter(new Date(this.todayMoment)) && moment(day).isBefore(new Date(this.maxDayMoment));
  }

  generateLinkForButtons(): void {
    this.court$.subscribe(court => {
      console.log(JSON.stringify(court))
    })
  }

  ngOnInit(): void {
  }

}
