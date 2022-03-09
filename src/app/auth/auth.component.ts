import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
    let pics = [true, false, false]
    setInterval(function (){
      if (pics[0])
      {
        pics[0] = false;
        pics[1] = true;
        // @ts-ignore
        document.getElementById('1_next').click()

      }
      else if (pics[1]){
        pics[1] = false
        pics[2] = true
        // @ts-ignore
        document.getElementById('2_next').click()
      }
      else if (pics[2]){
        pics[2] = false;
        pics[1] = true;
        // @ts-ignore
        document.getElementById('3_next').click()
      }
    }, 5000)
  }

}
