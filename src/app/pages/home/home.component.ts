import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FriendModalComponent} from '../friend-modal/friend-modal.component';
import {User} from '../../interfaces/user';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {FriendService} from '../../services/friend.service';
import {Friend} from '../../interfaces/friend';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  friedsList: Friend[] = [];

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private friendService: FriendService) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        console.log(this.user);
        this.getFriends();
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  getFriends() {
    if (this.user) {
      this.friendService.getFriends().valueChanges().subscribe((data: Friend[]) => {
        console.log(data);
        this.friedsList = data;
      }, (error) => {
        console.log(error);
      });
    }
  }

  openAddFriendModal() {
    const modal = this.modalService.open(FriendModalComponent);
  }
}
