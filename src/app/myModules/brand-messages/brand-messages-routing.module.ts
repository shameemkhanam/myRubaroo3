import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandMessagesComponent } from './brand-messages.component';

const routes: Routes = [
  {
    path:'',
    component: BrandMessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandMessagesRoutingModule { }
