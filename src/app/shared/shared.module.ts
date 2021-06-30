import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonGroupModule, NbButtonModule, NbCardModule, NbContextMenuDirective, NbContextMenuModule, NbInputModule, NbLayoutModule, NbListModule, NbSelectModule, NbToggleModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';


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
    HttpClientModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbListModule,
    NbSelectModule,
    NbButtonGroupModule,
    NbContextMenuModule,
    NbToggleModule
  ],
  exports: [
    // Exports des Modules afin de les rendres disponible dans l'application
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbEvaIconsModule,
    HttpClientModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbListModule,
    NbSelectModule,
    NbButtonGroupModule,
    NbContextMenuModule,
    NbToggleModule
  ]
})
export class SharedModule { }
