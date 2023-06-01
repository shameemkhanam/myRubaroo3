import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    SidenavComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule,
    MatListModule,
    RouterModule,
    NgbDropdownModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule    
  ]
})
export class SidenavModule { }
