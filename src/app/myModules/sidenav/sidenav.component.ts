import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  constructor(){}

  opened:boolean = true;

  list=[
    {
      no:'1',
      name: 'Dashboard',
      icon: 'fa-solid fa-gauge',
      link: 'dashboard'
    },
    {
      no:'2',
      name: 'Doctors',
      icon: 'fa-solid fa-user-doctor',
      link: 'doctors'
    },
    {
      no:'3',
      name: 'Brand Messages',
      icon: 'fa-solid fa-message'
    },
    {
      no:'4',
      name: 'Curated List',
      icon: 'fa-solid fa-list'
    }
  ];

  

}
