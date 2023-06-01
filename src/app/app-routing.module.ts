import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './myModules/sidenav/sidenav.component';

const routes: Routes = [
  { path: '', redirectTo: 'userAuth/login', pathMatch: 'full' },
  {
    path: 'userAuth',
    loadChildren: () =>
      import('./myModules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'sidenav',
    component: SidenavComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren:()=> import('./myModules/dashboard/dashboard.module').then(mod=>mod.DashboardModule)
      },
      {
        path: 'doctors',
        loadChildren:()=> import('./myModules/doctors/doctors.module').then(mod=>mod.DoctorsModule)
      },
      {
        path: 'questions',
        loadChildren:()=> import('./myModules/brand-messages/brand-messages.module').then(mod => mod.BrandMessagesModule)
      },
      {
        path:'surveys',
        loadChildren:()=> import('./myModules/surveys/surveys.module').then(mod => mod.SurveysModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
