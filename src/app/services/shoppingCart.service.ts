import { BehaviorSubject } from "rxjs";
import { AuthService } from "./auth.service";
import { shoppingCartItemModel } from "../model/shopping-cart.model";
import { Injectable } from "@angular/core";
@Injectable({ providedIn: 'root' })
export class shoppingCartItemService {
    private cartItems: shoppingCartItemModel[] = [];
    private cartItemsQuantity: number = 0;
    private cartItemsTotal: number = 0;

    private cartCount = new BehaviorSubject<number>(0);
    cartCount$ = this.cartCount.asObservable();

    constructor(private aService: AuthService) {
        this.loadCartItems();
    }
    get CartItems() { this.loadCartItems(); return this.cartItems; }
    get CartItemsCount() { return this.cartItemsQuantity }
    get CartItemsTotal() { return this.cartItemsTotal }

    addItemToCart(_cartItem: shoppingCartItemModel) {
        this.loadCartItems();

        const itemIndex = this.cartItems.findIndex(x => x.id === _cartItem.id);
        if (itemIndex > -1) {
            this.cartItems[itemIndex].quantity += 1;
            this.cartItems[itemIndex].totalPrice = this.cartItems[itemIndex].quantity * this.cartItems[itemIndex].price;
        }
        else {
            this.cartItems.push(_cartItem);

        }
        this.saveCartItem();
    }

    removeItemFromCart(_cartItem: shoppingCartItemModel) {
        this.loadCartItems();
        const itemIndex = this.cartItems.findIndex(x => x.id === _cartItem.id && x.quantity > 1);
        if (itemIndex > -1) {
            this.cartItems[itemIndex].quantity += -1;
            this.cartItems[itemIndex].totalPrice = this.cartItems[itemIndex].quantity * this.cartItems[itemIndex].price;
        }
        else {
            let index = this.cartItems.findIndex(x => x.id === _cartItem.id);
            this.cartItems.splice(index, 1);
        }
        this.saveCartItem();
    }
    clearCartItems() {
        let cartItemsStorageKey = this.aService.loggedInUserId + 'cart_items';
        let cartItemsCountKey = this.aService.loggedInUserId + 'cart_count';
        localStorage.removeItem(cartItemsStorageKey);
        localStorage.removeItem(cartItemsCountKey);
        this.loadCartItems();
    }
    loadCartItems() {
        let cartItemsStorageKey = this.aService.loggedInUserId + 'cart_items';
        this.cartItems = JSON.parse(localStorage.getItem(cartItemsStorageKey) || '[]');

        let totalQty = 0;
        this.cartItems.forEach(_item => { totalQty += _item.quantity });

        this.cartCount.next(totalQty);

        let _totalPrice = 0;
        this.cartItems.forEach(_item => { _totalPrice += _item.totalPrice })

        this.cartItemsQuantity = totalQty;
        this.cartItemsTotal = _totalPrice

    }
    saveCartItem() {
        let cartItemsStorageKey = this.aService.loggedInUserId + 'cart_items';
        let cartItemsCountKey = this.aService.loggedInUserId + 'cart_count';

        localStorage.setItem(cartItemsStorageKey, JSON.stringify(this.cartItems));
        localStorage.setItem(cartItemsCountKey, this.cartItemsQuantity.toString());

        this.cartCount.next(this.cartItemsQuantity);
    }


}










