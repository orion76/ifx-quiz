import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputTextModule} from 'primeng/inputtext';
import {COMMON_SERVICE,  STORAGE_SERVICE} from './types';
import {StorageService} from './storage.service';
import {CommonService} from './common.service';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AutoCompleteModule,
    InputTextModule,
    TableModule,
    ButtonModule
  ],
  providers: [
    {provide: COMMON_SERVICE, useClass: CommonService},
    {provide: STORAGE_SERVICE, useClass: StorageService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
