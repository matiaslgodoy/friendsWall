import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {AngularFireStorage} from '@angular/fire/storage';
import {PhotoService} from '../../../services/photo.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Photo} from '../../../models/photo';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent implements OnInit {

  @Input()
  photo: Photo = <Photo> {
    name: '',
    picture: '',
    contact: '',
    contactType: 'none',
    posX: 0,
    posY: 0,
    size: 'small'
  };
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isLoadImage = false;
  picture: any;
  photoFileName = 'up-photo';

  constructor(public activeModal: NgbActiveModal,
              private firebaseStorage: AngularFireStorage,
              private photoService: PhotoService,
              private toastr: ToastrService) {
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
          this.photo.picture = p;
          this.photoService.insetPhoto(this.photo);
          this.toastr.success('Foto agregada!');
          this.activeModal.close();
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  updatePhoto(){
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {
        this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) => {
          this.photo.picture = p;
          this.photoService.updatePhoto(this.photo);
          //this.toastr.success('Foto agregada!');
          this.activeModal.close();
        });
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.photoService.updatePhoto(this.photo);
      this.activeModal.close();
    }
  }

}
