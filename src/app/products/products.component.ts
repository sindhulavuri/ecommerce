import { Component, OnInit } from '@angular/core';
import { productModel } from '../model/product.model';
import { CategoryModel } from '../model/category.model';
import { productService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

import { shoppingCartItemModel } from '../model/shopping-cart.model';
import { shoppingCartItemService } from '../services/shoppingCart.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product: productModel[] = [];
  category: CategoryModel[] = [];
  selectedCategory: string = '';
  searchTerm: string;
  constructor(private pService: productService, private cService: CategoryService, private cartService: shoppingCartItemService) {

  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.loadProducts();
    this.loadCategory();
  }
  loadProducts() {
    this.pService.read(this.selectedCategory, this.searchTerm).subscribe(response => {
      this.product = response.map((data) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as productModel
        }
      })
    })
  }
  loadCategory() {
    this.cService.read()
      .subscribe(response => {
        this.category = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as CategoryModel
          }
        })
      })
  }

  changeCategory($event: any) {
    if ($event.target.selectedIndex > 0)
      this.selectedCategory = this.category[$event.target.selectedIndex - 1].id!;

    else
      this.selectedCategory = '';
    this.loadProducts();
  }
  addToCart(item: productModel) {
    let cartItem = item as shoppingCartItemModel;
    cartItem.quantity = 1;
    cartItem.totalPrice = cartItem.quantity * cartItem.price;
    this.cartService.addItemToCart(cartItem);
  }
  removeFromCart(item: productModel) {
    let cartItem = item as shoppingCartItemModel;
    cartItem.quantity = -1;
    this.cartService.removeItemFromCart(cartItem);
  }
  getQuantity(product: productModel) {
    let itemQty: number = 0;
    this.cartService.CartItems.filter(item => item.id === product.id).forEach(_item => { itemQty += _item.quantity })
    return itemQty;
  }


}
