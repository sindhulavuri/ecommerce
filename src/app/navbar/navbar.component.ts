import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { shoppingCartItemService } from '../services/shoppingCart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  shoppingCartItemCount$: Observable<number>;
  constructor(private router: Router, public aService: AuthService, private cartService: shoppingCartItemService) {
    this.shoppingCartItemCount$ = cartService.cartCount$;
  }
  logout() {
    localStorage.removeItem('displayName');
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('isAdmin');

    this.cartService.clearCartItems();

    this.router.navigate(['/login']);
  }
}
