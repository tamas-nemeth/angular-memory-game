import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,

    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: HomeComponent}
    ])
  ],
  declarations: [HomeComponent]
})
export class MemoryHomeModule {}
