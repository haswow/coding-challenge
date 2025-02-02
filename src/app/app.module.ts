import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './add-user/add-user.component';
@NgModule({
  declarations: [AppComponent, UserComponent, AddUserComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
