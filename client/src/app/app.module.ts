import { authConfig } from './auth.config';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {
  AuthConfig,
  JwksValidationHandler,
  OAuthModule,
  ValidationHandler
} from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot(
      // {
    //   resourceServer: {
    //     allowedUrls: ['http://www.angular.at/api'],
    //     sendAccessToken: true
    //   }
    // }
    )
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
