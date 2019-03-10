import config from "../../../config";
import Auth from "./auth";
import { AuthorizationRequiredException } from "../../../exceptions";

class BearerAuth extends Auth {
  constructor(authService, appConfig = config) {
    super("bearer", appConfig);
    this.authService = authService;
  }

  authorizate(resolve, reject, token) {
    return this.authService
      .verifyToken(token)
      .then(payload => resolve(payload))
      .catch(() => reject(new AuthorizationRequiredException()));
  }
}

export default BearerAuth;
