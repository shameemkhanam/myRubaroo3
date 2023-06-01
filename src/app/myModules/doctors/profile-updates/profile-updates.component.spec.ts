import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUpdatesComponent } from './profile-updates.component';

describe('ProfileUpdatesComponent', () => {
  let component: ProfileUpdatesComponent;
  let fixture: ComponentFixture<ProfileUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUpdatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
