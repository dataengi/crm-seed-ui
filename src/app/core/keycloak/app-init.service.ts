import {KeycloakService} from "keycloak-angular";

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: 'http://localhost:8080/auth/',
            realm: 'master',
            clientId: 'testClient',
            credentials: {
              secret: '9f6d356a-e31a-4a4a-8197-452d22c731c0'
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

