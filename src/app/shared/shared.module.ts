import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    ProgressSpinnerComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    NgbModule
  ],
  exports: [
    ProgressSpinnerComponent
  ]
})
export class SharedModule { }
