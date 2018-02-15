import {KeycloakService} from "keycloak-angular";
import {keycloakEnv} from "../../../environments/keycloak-environment"

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: keycloakEnv.config,
          initOptions: keycloakEnv.initOptions,
          bearerExcludedUrls: keycloakEnv.bearerExcludedUrls
        });
        resolve()
      } catch (error) {
        reject(error);
      }
    });
  };
}

