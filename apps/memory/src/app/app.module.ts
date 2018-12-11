import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';

import { NxModule } from '@nrwl/nx';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        {path: '', loadChildren: '@supergames/memory-home#MemoryHomeModule'},
        {path: 'game', loadChildren: '@supergames/memory-game#MemoryGameModule'}
      ],
      {initialNavigation: 'enabled'}),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
