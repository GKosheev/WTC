import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from "moment";
import {CourtsService} from "../../services/courts/courts.service";
import {Observable, Subscription} from "rxjs";
import {GeneralCourtInfo} from "../../interfaces/courts/GeneralCourtInfo";
import {Courts} from "../../interfaces/courts/Courts";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";


@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.scss']
})
export class CourtsComponent implements OnInit, OnDestroy {
  courts: Courts | null = null
  allCourtsInfo: Observable<GeneralCourtInfo[] | null>
  loadCourtsInfo: Subscription
  loadCourts: Subscription | null = null
  date: string
  courtServerLoading: boolean = false

  selectedCourtType: string | null = null

  constructor(private courtsService: CourtsService,
              private _snackBarService: SnackbarService) {
    this.loadCourtsInfo = this.courtsService.loadCourtInfo().subscribe()
    this.allCourtsInfo = this.courtsService.getShortCourts()
    this.date = moment().format("MM-DD-YYYY");
  }

  ngOnInit(): void {
  }


  loadCourt(courtType: string) {
    if (this.selectedCourtType === courtType) {
      this.selectedCourtType = null
      return
    }
    this.selectedCourtType = courtType
    this.courtServerLoading = true

    this.loadCourts = this.courtsService.loadCourt(courtType, this.date).subscribe(courts => {
        if (courts)
          this.courts = courts
        this.courtServerLoading = false
      },
      error => {
        if (error.error.msg)
          this._snackBarService.openSnackBar(error.error.msg, true)
      })

  }

  ngOnDestroy(): void {
    this.loadCourtsInfo.unsubscribe()
    this.loadCourts?.unsubscribe()
  }
}
