import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { NoAuthGuard } from '../../guardRouter/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
