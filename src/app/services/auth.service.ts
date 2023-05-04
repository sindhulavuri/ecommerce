import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserModel } from "../model/user.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private firestore: AngularFirestore) {

    }
    validate(email: string, password: string) {
        return this.firestore.collection('user', ref => ref.where('email', '==', email).where('password', '==', password)).snapshotChanges();
    }
    register(userModel: UserModel) {
        return this.firestore.collection('user').add({ ...userModel });
    }
    get displayName() {
        return localStorage.getItem('displayName');
    }
    get loggedInUserId() {
        return localStorage.getItem('loggedInUser');
    }
    get isAdmin(): boolean {
        return localStorage.getItem('isAdmin') === 'true';

    }
}

