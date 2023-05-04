import { Component, OnInit } from '@angular/core';
import { shoppingCartItemModel } from '../model/shopping-cart.model';
import { shoppingCartItemService } from '../services/shoppingCart.service';
import { Router } from '@angular/router';
import { productModel } from '../model/product.model';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  _cartItems: shoppingCartItemModel[] = [];
  constructor(private cartService: shoppingCartItemService, private router: Router) {

  }
  ngOnInit(): void {
    this._cartItems = this.cartService.CartItems
  }
  clearCart() {
    this.cartService.clearCartItems();
    this._cartItems = this.cartService.CartItems
  }
  checkOut() {
    this.router.navigate(['/checkout'])
  }
  addToCart(cartItem: shoppingCartItemModel) {
    this.cartService.addItemToCart(cartItem);
    this._cartItems = this.cartService.CartItems;
  }
  removeFromCart(cartItem: shoppingCartItemModel) {
    this.cartService.removeItemFromCart(cartItem);
    this._cartItems = this.cartService.CartItems;
  }
  getQuantity(_product: productModel) {
    let itemQty: number = 0;
    this.cartService.CartItems.filter(item => item.id === _product.id).forEach(_item => { itemQty += _item.quantity });
    return itemQty;
  }
  get totalPrice() {
    return this.cartService.CartItemsTotal;

  }
  get totalItemsCount() {
    return this.cartService.CartItemsCount;
  }

}
