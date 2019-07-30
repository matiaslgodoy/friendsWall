import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Photo} from '../models/photo';
import {UserService} from './user.service';
import {AuthenticationService} from './authentication.service';
import {User} from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photoList: AngularFireList<any>;
  selectPhoto: Photo = <Photo>{};
  user: User;

  constructor(private db: AngularFireDatabase,
              private userService: UserService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }
  getPhotos() {
    return this.photoList = this.db.list('photos');
  }
  insetPhoto(photo: Photo) {
    photo.userId = this.user.uid;
    this.photoList.push(photo);
  }

  updatePhoto(photo: Photo) {
    this.photoList.update(photo.$key, {
      name: photo.name,
      contact: photo.contact,
      contactType: photo.contactType,
      picture: photo.picture,
      userId: this.user.uid,
      posX: photo.posX,
      posY: photo.posY
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
