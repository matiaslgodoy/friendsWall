import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendModalComponent } from './friend-modal.component';

describe('FriendModalComponent', () => {
  let component: FriendModalComponent;
  let fixture: ComponentFixture<FriendModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
