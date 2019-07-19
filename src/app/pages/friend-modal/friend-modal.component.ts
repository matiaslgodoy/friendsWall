import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Friend} from '../../interfaces/friend';
import {AngularFireStorage} from '@angular/fire/storage';
import {FriendService} from '../../services/friend.service';

@Component({
  selector: 'app-friend-modal',
  templateUrl: './friend-modal.component.html',
  styleUrls: ['./friend-modal.component.css']
})
export class FriendModalComponent implements OnInit {
  friend: Friend = <Friend>{};
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isLoadImage = false;
  picture: any;

  constructor(public activeModal: NgbActiveModal,
              private firebaseStorage: AngularFireStorage,
              private friendService: FriendService) { }

  ngOnInit() {

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
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

  addFiend(){
    // if (this.croppedImage) {
    //   const currentPictureId = Date.now();
    //   const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
    //   pictures.then((result) => {
    //     this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
    //     this.picture.subscribe((p) => {
    //       this.friendService.setAvatar(p, this.user.uid).then(() => {
    //         alert('Avatar subido correctamentne');
    //       }).catch((error) => {
    //         alert('Hubo un error al tratar de subir la imagen');
    //         console.log(error);
    //       });
    //     });
    //   }).catch((error) => {
    //     console.log(error);
    //   });
    // } else {
    //   this.userService.editUser(this.user).then(() => {
    //     alert('Cambios guardados!');
    //   }).catch((error) => {
    //     alert('Hubo un error');
    //     console.log(error);
    //   });
    // }
  }

}
