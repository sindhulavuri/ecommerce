import { shippingModel } from "./shipping.model";
import { shoppingCartItemModel } from "./shopping-cart.model";

export class OrderModel {
    id?: string;
    userId: string;
    datePlaced: number;
    shippingDetails: shippingModel = new shippingModel();
    items: shoppingCartItemModel[] = [];
    amount: number;
}