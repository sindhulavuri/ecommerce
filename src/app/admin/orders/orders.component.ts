import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/model/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  presentPage: number = 1
  adminorders: OrderModel[] = [];
  constructor(public service: OrderService) { }
  ngOnInit(): void {
    this.service.getAdminOrders()
      .subscribe(response => {
        this.adminorders = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as OrderModel
          }
        });
      })

  }

}
