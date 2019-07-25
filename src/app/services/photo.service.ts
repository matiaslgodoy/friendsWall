import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Photo} from '../interfaces/photo';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photoList: AngularFireList<any>;
  selectPhoto: Photo = <Photo>{};

  constructor(private db: AngularFireDatabase) {
  }
  getPhotos() {
    //return this.angularFireDatabase.list('/');
    return this.photoList = this.db.list('photos');
  }
  insetPhoto(photo: Photo) {
     this.photoList.push(photo);
    // this.photoList.push({
    //   name: photo.name,
    //   contact: photo.contact,
    //   contactType: photo.contactType,
    //   picture: photo.picture
    // });
  }

  updatePhoto(photo: Photo) {
    this.photoList.update(photo.$key, {
      name: photo.name,
      contact: photo.contact,
      contactType: photo.contactType,
      picture: photo.picture
    });
  }

  deletePhoto($key: string) {
    this.photoList.remove($key);
  }

  getPhotoById(uid) {
    return this.db.object('/photos/' + uid);
  }
  createPhoto(photo) {
    return this.db.object('/photos/' + photo.key).set(photo);
  }
  editPhoto(photo) {
    return this.db.object('/photos/' + photo.uid).set(photo);
  }

}
