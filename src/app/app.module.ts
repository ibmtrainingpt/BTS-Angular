import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { BugComponent } from './bug/bug.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { SearchbugComponent } from './searchbug/searchbug.component'
import {RouterModule} from '@angular/router';
import { UpdateComponent } from './update/update.component'
import {EllipsisPipe} from './EllipsisPipe'

@NgModule({
  declarations: [
    AppComponent,
    BugComponent,
    SearchbugComponent,
    UpdateComponent,
    EllipsisPipe
  ],
  imports: [
    BrowserModule, RouterModule.forRoot([
      {path: 'create', component: BugComponent},
      {path: 'search', component: SearchbugComponent},
      {path: 'update', component: UpdateComponent},
      {path: '', redirectTo: '/search', pathMatch: 'full'},
    ]), FormsModule, BrowserAnimationsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
