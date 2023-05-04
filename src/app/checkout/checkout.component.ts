import { Component, OnInit } from '@angular/core';
import { shoppingCartItemModel } from '../model/shopping-cart.model';
import { shippingModel } from '../model/shipping.model';
import { shoppingCartItemService } from '../services/shoppingCart.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { OrderModel } from '../model/order.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  _cartItems: shoppingCartItemModel[] = [];
  shipping = new shippingModel();
  constructor(private cService: shoppingCartItemService, private router: Router, private OService: OrderService, private toast: ToastrService) {

  }
  ngOnInit(): void {
    this._cartItems = this.cService.CartItems;
  }
  get totalPrice() {
    return this.cService.CartItemsTotal;
  }
  get totalItemsCount() {
    return this.cService.CartItemsCount;
  }
  placeOrder() {
    let order = new OrderModel();
    order.datePlaced = new Date().getTime();
    order.amount = this.cService.CartItemsTotal;
    order.userId = localStorage.getItem('loggedInUserId')!;
    order.items = this._cartItems;
    order.shippingDetails = {
      name: this.shipping.name,
      addressLine1: this.shipping.addressLine1,
      addressLine2: this.shipping.addressLine2,
      city: this.shipping.city

    };
    this.OService.create(order)
      .then((response) => {
        this.cService.clearCartItems();
        this.toast.success('Order placed successfully');
        this.router.navigate(['/ordersuccess']);
      })
      .catch((error: any) => {
        this.toast.error('un-handled exception occured');
      });
  }

}
