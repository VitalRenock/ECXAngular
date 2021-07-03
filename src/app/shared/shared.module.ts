import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbBadgeModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbContextMenuDirective, NbContextMenuModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbSelectModule, NbToastrModule, NbToastrService, NbToggleModule, NbWindowModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { config } from 'rxjs';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    
    // Imports des Modules à partager dans l'application
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    HttpClientModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbListModule,
    NbSelectModule,
    NbButtonGroupModule,
    NbContextMenuModule,
    NbToggleModule,
    NbWindowModule.forChild(),
    NbBadgeModule
  ],
  exports: [
    // Exports des Modules afin de les rendres disponible dans l'application
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    HttpClientModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbListModule,
    NbSelectModule,
    NbButtonGroupModule,
    NbContextMenuModule,
    NbToggleModule,
    NbWindowModule,
    NbBadgeModule
  ]
})
export class SharedModule { }
