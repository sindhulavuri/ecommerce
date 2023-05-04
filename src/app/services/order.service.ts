import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { OrderModel } from "../model/order.model";
@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor(private fireStore: AngularFirestore) {

    }
    create(order: OrderModel) {
        return this.fireStore.collection('orders').add({ ...order });
    }
    getUserOrders(userId: string) {
        return this.fireStore.collection('orders', ref => ref.where('userId', '==', userId)).snapshotChanges();
    }
    getAdminOrders() {
        return this.fireStore.collection('orders').snapshotChanges();
    }
    getById(id: string) {
        return this.fireStore.doc('orders/' + id).valueChanges();
    }
}
