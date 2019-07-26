import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Photo} from '../../../models/photo';
import {PhotoService} from '../../../services/photo.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PhotoModalComponent} from '../photo-modal/photo-modal.component';
import {YesNoModalComponent} from '../../yes-no-modal/yes-no-modal.component';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  @Input()
  photo: Photo;
  showOption: false;
  contactUrl: string;
  @ViewChild('ElementRefName') element: ElementRef;

  constructor(private photoService: PhotoService,
              private modalService: NgbModal) { }

  ngOnInit() {
    if (this.photo.contactType != 'none') {
      switch (this.photo.contactType) {
        case 'facebook':
          this.contactUrl =  'https://www.facebook.com/' + this.photo.contact;
          break;
        case 'instagram':
          this.contactUrl =  'https://www.instagram.com/' + this.photo.contact;
          break;
        case  'twitter':
          this.contactUrl =  'https://twitter.com/' + this.photo.contact;
          break;
      }
    }
  }

  uptadePhoto() {
    const modal = this.modalService.open(PhotoModalComponent);
    modal.componentInstance.photo = this.photo;
  }

  deletePhoto() {
    const modal = this.modalService.open(YesNoModalComponent);
    modal.componentInstance.yesNoAnswer.subscribe((yesNo: any) => {
      if (yesNo) {
        // console.log('Eliminado!');
        this.photoService.deletePhoto(this.photo.$key);
      }
    });
  }

  mouseUp(event){
    // HTML --> (window:mouseup)="mouseUp($event)"
    console.log('mouseUp');
  }

}
