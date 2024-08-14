import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import { PostsServices } from './services/posts.service';
import { PostsResolver } from './resolvers/posts.resolver';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PostListItemComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    SharedModule
  ],
  providers:[
    PostsServices,
    PostsResolver
  ]
})
export class SocialMediaModule { }
