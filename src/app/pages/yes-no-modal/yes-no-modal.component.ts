import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-yes-no-modal',
  templateUrl: './yes-no-modal.component.html',
  styleUrls: ['./yes-no-modal.component.css']
})
export class YesNoModalComponent implements OnInit {

  @Output()
  yesNoAnswer: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onSendAnswer(yesNo: boolean) {
    this.yesNoAnswer.emit(yesNo);
    this.activeModal.dismiss();
  }
}
