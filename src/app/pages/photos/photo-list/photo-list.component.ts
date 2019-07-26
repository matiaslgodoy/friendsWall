import { Component, OnInit } from '@angular/core';
import {PhotoService} from '../../../services/photo.service';
import {Photo} from '../../../models/photo';
import {extractMessages} from '@angular/compiler/src/i18n/extractor_merger';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photoList: Photo[];

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.getPhotos()
      .snapshotChanges()
      .subscribe((item) => {
        this.photoList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.photoList.push(x as Photo);
        });
      });
  }

}
