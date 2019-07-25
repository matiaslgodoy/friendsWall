import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFireDatabase: AngularFireDatabase) {}
  getUsers() {
    return this.angularFireDatabase.list('/users');
  }
  getUserById(uid) {
    return this.angularFireDatabase.object('/users/' + uid);
  }
  createUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }
  editUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }
  setAvatar(avatar, uid) {
    return this.angularFireDatabase.object('/users/' + uid + '/avatar').set(avatar);
  }
  addPhoto(userId, photoId) {
    this.angularFireDatabase.object('users/' + userId + '/photos/' + photoId).set(photoId);
    return this.angularFireDatabase.object('users/' + photoId + '/photos/' + userId).set(userId);
  }
}
