import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { productModel } from "../model/product.model";
@Injectable({ providedIn: 'root' })
export class productService {
    constructor(private firstore: AngularFirestore) {

    }
    create(product: productModel) {
        return this.firstore.collection('product').add({ ...product });
    }
    read(term: string, categorys: string = '') {
        if (term && categorys)
            return this.firstore.collection('product', ref => ref.where('category', '==', categorys).orderBy('title').startAt(term).endAt(`${term}\uf8ff`)).snapshotChanges();
        else if (categorys)
            return this.firstore.collection('product', ref => ref.where('category', '==', categorys)).snapshotChanges();
        else if (term)
            return this.firstore.collection('product', ref => ref.orderBy('title').startAt(term).endAt(`${term}\uf8ff`)).snapshotChanges();
        else
            return this.firstore.collection('product').snapshotChanges();
    }
    update(id: string, product: productModel) {
        return this.firstore.doc('product/' + id).update({ ...product });
    }
    delete(id: string) {
        return this.firstore.doc('product/' + id).delete();
    }
    getById(id: string) {
        return this.firstore.doc('product/' + id).valueChanges();
    }
}