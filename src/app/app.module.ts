import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { GraphQLModule } from './graphql';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MaterialModule,
  HeaderComponent,
} from './ui';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GraphQLModule,
    MaterialModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    // UI Components
    HeaderComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
