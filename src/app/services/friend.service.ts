import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Friend} from '../interfaces/friend';
import {Pipe, PipeTransform} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  friendsList: Friend[];
  constructor(private angularFireDatabase: AngularFireDatabase) {
  }
  getFriends() {
    return this.angularFireDatabase.list('/friends');
  }
  getFriendsByUserId(userId) {
    this.friendsList = this.angularFireDatabase.list('/friends/' + userId);
    // return this.friendsList;

    // return this.friendsList .filter( (item) => {
    //   return JSON.stringify(item).toLowerCase().includes(userId);
    // });
  }
  getFriendById(uid) {
    return this.angularFireDatabase.object('/friends/' + uid);
  }
  createFriend(friend) {
    return this.angularFireDatabase.object('/friends/' + friend.uid).set(friend);
  }
  editUser(friend) {
    return this.angularFireDatabase.object('/friends/' + friend.uid).set(friend);
  }
  setAvatar(avatar, uid) {
    return this.angularFireDatabase.object('/friends/' + uid + '/avatar').set(avatar);
  }
}
