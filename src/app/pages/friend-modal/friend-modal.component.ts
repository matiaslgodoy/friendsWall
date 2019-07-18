import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Friend} from '../../interfaces/friend';

@Component({
  selector: 'app-friend-modal',
  templateUrl: './friend-modal.component.html',
  styleUrls: ['./friend-modal.component.css']
})
export class FriendModalComponent implements OnInit {
  friend: Friend = <Friend>{};
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log('MODAL!!!!');
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

}
