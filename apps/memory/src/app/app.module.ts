import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';

import { NxModule } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { MEMORY_FEATURE_KEY, initialState as memoryInitialState, memoryReducer } from './+state/memory.reducer';
import { MemoryEffects } from './+state/memory.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        {path: '', loadChildren: '@nggames/memory-home#MemoryHomeModule'},
        {path: 'game', loadChildren: '@nggames/memory-game#MemoryGameModule'}
      ],
      {initialNavigation: 'enabled'}),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    StoreModule.forRoot(
  { memory: memoryReducer },
  {
    initialState : { memory : memoryInitialState },
    metaReducers : !environment.production ? [storeFreeze] : []
  }
),
    EffectsModule.forRoot([MemoryEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
