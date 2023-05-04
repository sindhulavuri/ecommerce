import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { CategoryModel } from "../model/category.model";

@Injectable({ providedIn: 'root' })
export class CategoryService {
    constructor(private fireStore: AngularFirestore) {

    }
    create(category: CategoryModel) {
        return this.fireStore.collection('category').add({ ...category });
    }
    read() {
        return this.fireStore.collection('category').snapshotChanges();
    }
    update(id: string, category: CategoryModel) {
        return this.fireStore.doc('category/' + id).update({ ...category });
    }
    delete(id: string) {
        return this.fireStore.doc('category' + id).delete();

    }
    getById(id: string) {
        return this.fireStore.doc('category/' + id).valueChanges();
    }
}