import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-friend-modal',
  templateUrl: './friend-modal.component.html',
  styleUrls: ['./friend-modal.component.css']
})
export class FriendModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log('MODAL!!!!');
  }

  //funcionalidad de agregar
}
