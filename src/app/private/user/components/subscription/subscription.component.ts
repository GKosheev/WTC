import {Component, OnInit} from '@angular/core';
import {SubscriptionService} from "../../services/subscription/subscription.service";
import {SubType} from "../../interfaces/subscription/SubType";
import * as moment from "moment";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";
import {PaymentsService} from "../../services/payments/payments.service";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  subs: SubType[] = []
  serverLoadSubs: boolean = false;
  serverLoadAddSubPayment: boolean = false;

  constructor(private subService: SubscriptionService,
              private snackBar: SnackbarService,
              private paymentService: PaymentsService) {
  }

  ngOnInit(): void {
    this.getAllSubs()
  }


  getAllSubs(): void {
    this.serverLoadSubs = true
    this.subService.getAllSubs().subscribe(subs => {
      this.serverLoadSubs = false;
      if (subs)
        this.subs = subs

      /* Custom time format */
      if (subs)
        subs.forEach(sub => {
          sub.subStart = moment(sub.subStart).format('MMMM D')
          sub.subEnd = moment(sub.subEnd).format('MMMM D')
        })
    })
  }

  addToPayments(subType: string, subName: string): void {
    this.serverLoadAddSubPayment = true
    this.subService.addSubToPayments(subType, subName).subscribe(response => {
      this.serverLoadAddSubPayment = false;
      this.paymentService.updatePayments()
      if (response.msg)
        this.snackBar.openSnackBar(response.msg, false, 5)
    }, error => {
      if (error.error.msg)
        this.snackBar.openSnackBar(error.error.msg, true, 5)
    })
  }

}
