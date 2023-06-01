import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  collapsed = true;
  @Output() sidenavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  sidenavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sidenavToggled.emit(this.menuStatus);
  }
}
