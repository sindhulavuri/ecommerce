import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';




import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { CategoryComponent } from './admin/category/category.component';

import { ProductComponent } from './admin/product/product.component';
import { ProductsComponent } from './products/products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { CategoryService } from './services/category.service';
import { productService } from './services/product.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { shoppingCartItemService } from './services/shoppingCart.service';
import { OrdersuccessComponent } from './ordersuccess/ordersuccess.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { OrderService } from './services/order.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AdminGuardService } from './guard/admin.guard';
import { AuthGuardService } from './guard/auth.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AdminGuardService, AuthGuardService] },
  { path: 'admin/category', component: CategoryComponent, canActivate: [AdminGuardService, AuthGuardService] },
  { path: 'admin/product', component: ProductComponent, canActivate: [AdminGuardService, AuthGuardService] },
  { path: 'admin/orders', component: OrdersComponent, canActivate: [AdminGuardService, AuthGuardService] },
  { path: 'ordersuccess', component: OrdersuccessComponent },
  { path: 'orderdetails/:id', component: OrderdetailsComponent },
  { path: 'unauthorized', component: UnauthorizedComponent }






]






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    CategoryComponent,
    ProductComponent,
    RegisterComponent,
    ProductComponent,
    ProductsComponent,
    MyOrdersComponent,
    OrdersComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrdersuccessComponent,
    OrderdetailsComponent,
    UnauthorizedComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),

  ],
  providers: [AuthService, CategoryService, productService, shoppingCartItemService, OrderService, AdminGuardService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
