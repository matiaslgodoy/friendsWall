import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/user';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {FriendService} from '../../services/friend.service';
import {Friend} from '../../models/friend';
import {PhotoModalComponent} from '../photos/photo-modal/photo-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  fiendsList: Friend[] = [];

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private friendService: FriendService) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        console.log(this.user);
        // this.getFriends();
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  // getFriends() {
  //   if (this.user) {
  //     this.friendService.getFriends().valueChanges().subscribe((data: Friend[]) => {
  //       console.log(data);
  //       this.fiendsList = data;
  //     }, (error) => {
  //       console.log(error);
  //     });
  //   }
  // }

  openAddFriendModal() {
    const modal = this.modalService.open(PhotoModalComponent);
  }
}
