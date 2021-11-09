import { Component, OnInit } from '@angular/core';


interface Quantity {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  quantitys: Quantity[] = [
    { value: 'quantity-1', viewValue: '1' },
    { value: 'quantity-2', viewValue: '2' },
    { value: 'quantity-3', viewValue: '3' },
    { value: 'quantity-4', viewValue: '4' },
    { value: 'quantity-5', viewValue: '5' },
    { value: 'quantity-6', viewValue: '6' },
    { value: 'quantity-7', viewValue: '7' },
    { value: 'quantity-8', viewValue: '8' },
    { value: 'quantity-9', viewValue: '9' },
    { value: 'quantity-10', viewValue: '10+' }
  ];

  constructor() { }

  ngOnInit(): void {
  }


}
