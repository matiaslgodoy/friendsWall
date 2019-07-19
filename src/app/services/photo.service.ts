import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private angularFireDatabase: AngularFireDatabase) {
  }
  getPhotos() {
    return this.angularFireDatabase.list('/');
  }
  getPhotoById(uid) {
    return this.angularFireDatabase.object('/photos/' + uid);
  }
  createPhoto(photo) {
    return this.angularFireDatabase.object('/photos/' + photo.uid).set(photo);
  }
  editPhoto(photo) {
    return this.angularFireDatabase.object('/photos/' + photo.uid).set(photo);
  }

}
