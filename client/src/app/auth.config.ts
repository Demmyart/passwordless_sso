import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: "http://localhost:5000",

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'angular',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email role api1',

  // silentRefreshShowIFrame: true,

  // showDebugInformation: true,

  // sessionChecksEnabled: false,
  requireHttps: false,
  // dummyClientSecret : "ee0b59b4-f1e9-48e9-ae6b-f282e073e193"
};

