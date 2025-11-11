import { Routes } from '@angular/router';
import { FeedComponent } from './features/feed/feed.component';
import { ManageResourceComponent } from './features/manage-resource/manage-resource.component';

export const routes: Routes = [ { path: '', component: FeedComponent },
  { path: 'resource-manage', component: ManageResourceComponent },
  { path: 'resource-manage/:id', component: ManageResourceComponent },
  { path: '**', redirectTo: '' }];
