import {Component, Input, OnInit} from '@angular/core';
import {Friend} from '../../interfaces/friend';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalPhotoComponent} from '../modal-photo/modal-photo.component';
import {FriendModalComponent} from '../friend-modal/friend-modal.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input()
  fiendsList: Friend[] = [];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openAddPhotoModal() {
    const modal = this.modalService.open(ModalPhotoComponent);
  }

}
