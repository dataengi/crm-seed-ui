import {KeycloakOptions} from "keycloak-angular";

export const keycloakEnv:KeycloakOptions = {
    config: {
      url: 'URL', //Keycloak URL http://example.com/auth/
      realm: 'REALM',
      clientId: 'CLIENT_ID',
      credentials: {
        secret: 'SECRET'
      }
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false
    },
    bearerExcludedUrls: []
};
