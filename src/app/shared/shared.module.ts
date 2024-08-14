import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { UserNamePipe } from './pipes/user-name.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HightLightDerictive } from './directives/hightlight.directives';



@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    UserNamePipe,
    TimeAgoPipe,
    HightLightDerictive
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    CommentsComponent,
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe,
    UserNamePipe,
    TimeAgoPipe,
    HightLightDerictive
    
  ]
})
export class SharedModule { }
