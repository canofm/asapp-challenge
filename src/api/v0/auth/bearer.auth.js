import config from "../../../config";
import Auth from "./auth";

class BearerAuth extends Auth {
  constructor(authService, appConfig = config) {
    super("bearer", appConfig);
    this.authService = authService;
  }

  authorizate(resolve, reject, token) {
    return this.authService
      .verifyToken(token)
      .then(payload => resolve(payload))
      .catch(err => reject(err)); //TODO: Maybe should throw an exception
  }
}

export default BearerAuth;
