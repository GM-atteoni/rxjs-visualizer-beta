import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ObservablesAndSubjectsComponent } from './observables-and-subjects/observables-and-subjects.component';
import { HomeComponent } from './home/home.component';
import { OperatorsComponent } from './operators/operators.component';
import {MatDialogModule} from '@angular/material/dialog';
import { IntroDialogComponent } from './operators/intro-dialog/intro-dialog.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    ObservablesAndSubjectsComponent,
    HomeComponent,
    OperatorsComponent,
    IntroDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  providers: [],
  entryComponents: [IntroDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
