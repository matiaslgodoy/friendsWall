import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {ImageCropperModule} from 'ngx-image-cropper';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { FriendModalComponent } from './pages/friend-modal/friend-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { WallComponent } from './pages/wall/wall.component';
import { HomeComponent } from './pages/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    FriendModalComponent,
    WallComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ImageCropperModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    FriendModalComponent
  ]
})
export class AppModule { }
