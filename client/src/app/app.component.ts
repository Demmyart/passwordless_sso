import { authConfig } from './auth.config';
import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  apiUrl = 'http://localhost:5001/identity';
  apiUrl2 = 'http://localhost:5002/identity';
  loginFailed: boolean = false;
  userProfile: object;

  constructor(private oauthService: OAuthService, private http: HttpClient) {
    this.configureWithNewConfigApi();
  }

  ngOnInit(){
    this.configureWithNewConfigApi()
  }

  // This api will come in the next version
  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();


    this.oauthService.events
      .pipe(filter(e => e.type === 'session_terminated'))
      .subscribe(e => {
        // tslint:disable-next-line:no-console
        console.debug('Your session has been terminated!');
      });

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(e => {
        // this.oauthService.loadUserProfile();
      });
  }

  login() {
    this.oauthService.initImplicitFlow();
    // the parameter here is optional. It's passed around and can be used after logging in
  }

  logout() {
    this.oauthService.logOut();
  }

  loadUserProfile(): void {
    this.oauthService.loadUserProfile().then(up => (this.userProfile = up));
  }

  get givenName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['email'];
  }

  get familyName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims[''];
  }

  // set requestAccessToken(value: boolean) {
  //   this.oauthService.requestAccessToken = value;
  //   localStorage.setItem('requestAccessToken', '' + value);
  // }

  // get requestAccessToken() {
  //   return this.oauthService.requestAccessToken;
  // }

  get id_token() {
    return this.oauthService.getIdToken();
  }

  get access_token() {
    return this.oauthService.getAccessToken();
  }

  get id_token_expiration() {
    return this.oauthService.getIdTokenExpiration();
  }

  get access_token_expiration() {
    return this.oauthService.getAccessTokenExpiration();
  }

  api1(){
    this.http.get(this.apiUrl, { headers: this.getHeaders() }).subscribe((data) => console.log(data));
}

api2(){
  this.http.get(this.apiUrl2, { headers: this.getHeaders() }).subscribe((data) => console.log(data));
}


private getHeaders() {
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  return this.appendAuthHeader(headers);
}

private appendAuthHeader(headers: HttpHeaders) {
  const token = this.oauthService.getAccessToken();

  if (token === '') return headers;

  const tokenValue = 'Bearer ' + token;
  return headers.set('Authorization', tokenValue);
}



}
