import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../model/order.model';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  orderDetails: OrderModel = new OrderModel();
  constructor(private oService: OrderService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')!;
    this.oService.getById(id).subscribe(order => {
      this.orderDetails = order as OrderModel;
    });
  }
  redirectToOrdersPage() {
    let viewFrom = this.route.snapshot.queryParamMap.get('viewFrom');
    if (viewFrom === 'admin') {
      this.router.navigate(['/admin/orders']);

    }
    else {
      this.router.navigate(['/my-orders']);
    }
  }

}
