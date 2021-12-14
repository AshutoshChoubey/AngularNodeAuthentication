import { RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Child1Component } from './child1/child1.component';
const router =[
  {path:"child",component: Child1Component}
];

@NgModule({
  declarations: [
    AppComponent,Child1Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
