import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HasUsernameGuard } from './guard/has-username.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'meeting/:meetingID',
    canActivate: [HasUsernameGuard],
    loadChildren: () => import('./meeting/meeting.module').then(m => m.MeetingPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./explained/explained.module').then(m => m.ExplainedPageModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./members/members.module').then(m => m.MembersPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./toc/toc.module').then(m => m.TocPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyPageModule)
  },
  {
    path: '**',
    redirectTo: ''
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
