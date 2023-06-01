import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { ProfileUpdatesComponent } from './profile-updates/profile-updates.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorsComponent
  },
  {
    path:'update',
    component: ProfileUpdatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
