import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {AngularFireAuth} from '@angular/fire/auth';

export class Item {
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  // items: FirebaseListObservable<Item[]> = null;
  // userId: string;
  //
  // constructor(private db: AngularFireDatabase,
  //             private afAuth: AngularFireAuth) {
  //   this.afAuth.authState.subscribe(user => {
  //     if (user) this.userId = user.uid;
  //   });
  // }
  //
  // getItemsList(): FirebaseListObservable<Item[]> {
  //   if(this.userId) return;
  //   // this.items = this.db.list(`items/${this.userId}`);
  //   this.items = this.db.list('items/'+ this.userId);
  //   return this.items;
  // }
  //
  // createItem(item: Item) {
  //   this.items.push(item);
  // }
}
