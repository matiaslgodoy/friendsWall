import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Friend} from '../../interfaces/friend';
import {AngularFireStorage} from '@angular/fire/storage';
import {FriendService} from '../../services/friend.service';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Guid} from 'guid-typescript';

@Component({
  selector: 'app-friend-modal',
  templateUrl: './friend-modal.component.html',
  styleUrls: ['./friend-modal.component.css']
})
export class FriendModalComponent implements OnInit {
  user: User;
  friend: Friend = <Friend>{};
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isLoadImage = false;
  picture: any;

  constructor(public activeModal: NgbActiveModal,
              private firebaseStorage: AngularFireStorage,
              private friendService: FriendService,
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

  addFiend() {
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {
        this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) => {
          this.friend.uid = currentPictureId;
          this.friend.picture = p;
          this.friend.userId = this.user.uid;
          this.friendService.createFriend(this.friend).then(() => {
            alert('Amigo Agregado!');
          }).catch((error) => {
            console.log(error);
          });
          this.activeModal.close();
        });
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.userService.editUser(this.user).then(() => {
        alert('Cambios guardados!');
      }).catch((error) => {
        alert('Hubo un error');
        console.log(error);
      });
    }
  }
}
