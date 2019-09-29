import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GraphQLModule } from './graphql';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MaterialModule,
  HeaderComponent,
  ErrorComponent,
  ConfirmComponent,
} from './ui';
import {
  HomeComponent,
  UsersComponent,
  UserComponent,
  PostsComponent,
  UpdatePostComponent,
  DeletePostComponent,
  CommentsComponent,
} from './components';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    MaterialModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    // UI Components
    HeaderComponent,
    ErrorComponent,
    ConfirmComponent,
    // Feature Components
    HomeComponent,
    UsersComponent,
    UserComponent,
    PostsComponent,
    DeletePostComponent,
    CommentsComponent,
    UpdatePostComponent,
  ],
  entryComponents: [
    CommentsComponent,
    ConfirmComponent,
    UpdatePostComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
