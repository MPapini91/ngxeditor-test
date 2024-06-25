import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxEditorModule } from 'ngx-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomEditorComponent } from './custom-editor/custom-editor.component';
import { CustomMenuComponent } from './custom-menu/custom-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomEditorComponent,
    CustomMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
