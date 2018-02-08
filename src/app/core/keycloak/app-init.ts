import {KeycloakService} from "keycloak-angular";

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: 'http://localhost:8080/auth/',
            realm: 'demo',
            clientId: 'testClient',
            credentials: {
              secret: '1a6a4fca-c09d-41c9-b9cc-025b0ef878f8'
            }
          },
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          bearerExcludedUrls: []
        });
        resolve()
      } catch (error) {
        reject(error);
      }
    });
  };
}
