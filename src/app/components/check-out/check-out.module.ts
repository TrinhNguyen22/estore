import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckOutRoutingModule } from './check-out-routing.module';
import { CheckOutComponent } from './check-out.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';


@NgModule({
  declarations: [CheckOutComponent, ConfirmationComponent],
  imports: [
    CommonModule,
    CheckOutRoutingModule
  ],
  exports: [
    ConfirmationComponent
  ]
})
export class CheckOutModule { }
