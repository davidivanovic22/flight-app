import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {TranslateDurationPipe} from "../assets/pipes/trnaslate-duration.pipe";
import {MaterialModule} from "../assets/material.module";
import {FlightInformationComponent} from './flight-information/flight-information.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightInformationComponent,
    TranslateDurationPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
