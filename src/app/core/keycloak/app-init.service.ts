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
              secret: '2cb5ad07-829d-4606-a5a9-2347b3fb3a54'
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

