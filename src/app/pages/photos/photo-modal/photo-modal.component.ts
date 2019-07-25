import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../interfaces/user';
import {AngularFireStorage} from '@angular/fire/storage';
import {PhotoService} from '../../../services/photo.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Photo} from '../../../interfaces/photo';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent implements OnInit {

  user: User;
  photo: Photo = <Photo> {
    name: '',
    picture: '',
    contact: '',
    contactType: 'none'};
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isLoadImage = false;
  picture: any;
  photoFileName = 'up-photo';

  constructor(public activeModal: NgbActiveModal,
              private firebaseStorage: AngularFireStorage,
              private photoService: PhotoService,
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

  ngOnInit() {
    this.photoService.getPhotos();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    if (event.target.files && event.target.files[0]) {
      this.photoFileName = event.target.files[0].name;
    }
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

  addPhoto() {
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {
        this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) => {
          //this.photo.uid = this.user.uid + currentPictureId;
          this.photo.picture = p;
          //this.photo.userId = this.user.uid;
          this.photoService.insetPhoto(this.photo);


          // this.photoService.createPhoto(this.photo).then(() => {
          //   alert('Foto Agregada!');
          //   // this.userService.addPhoto(this.user, this.photo.uid).then(() => {
          //   //   alert('Foto Agregada!');
          //   // });
          // }).catch((error) => {
          //   console.log(error);
          // });
          this.activeModal.close();
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  }

}
