import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  operation: string = 'login';
  email: string = null;
  password: string = null;
  name: string = null;
  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.email, this.password).then( (data) => {
      alert('Loggeado correctamente');
      console.log(data);
      this.router.navigate(['home']);
    }).catch((error) => {
      alert('Ocurrioo un error');
      console.log(error);
    });
  }

  register() {
    this.authenticationService.registerWithEmail(this.email, this.password).then( (data) => {
      const user = {
        uid: data.user.uid,
        email: this.email,
        name: this.name
      };
      this.userService.createUser(user).then((data2) => {
        alert('Registrado correctamente');
        console.log(data2);
      }).catch((error) => {
        alert('Ocurrioo un error');
        console.log(error);
      });
    }).catch((error) => {
      alert('Ocurrioo un error');
      console.log(error);
    });
  }

}
