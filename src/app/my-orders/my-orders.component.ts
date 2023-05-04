import { Component } from '@angular/core';
import { OrderModel } from '../model/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  presentPage: number = 1
  myOrders: OrderModel[] = [];

  constructor(public service: OrderService) { }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    let userId = localStorage.getItem('loggedInUserId');

    this.service.getUserOrders(userId!)
      .subscribe(response => {
        this.myOrders = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as OrderModel
          }
        });

      })
  }
}


