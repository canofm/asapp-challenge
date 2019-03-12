import { Promise } from "bluebird";
import {
  AuthorizationRequiredException,
  UnsupportedAuthorizationMethodException
} from "../../../exceptions";

class Auth {
  constructor(authService, config) {
    this.appConfig = config;
    this.authService = authService;
  }

  auth(credentials) {
    return new Promise((resolve, reject) => {
      if (!credentials) {
        reject(new AuthorizationRequiredException());
      }
      const [method, token] = credentials.split(" ");
      if (!method) {
        reject(new AuthorizationRequiredException());
      }

      if (method === "Bearer") {
        return this.authService
          .verifyToken(token)
          .then(payload => resolve(payload))
          .catch(() => reject(new AuthorizationRequiredException()));
      } else {
        reject(new UnsupportedAuthorizationMethodException(method));
      }
    });
  }
}

export default Auth;
