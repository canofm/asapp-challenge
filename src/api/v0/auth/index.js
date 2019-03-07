import BearerAuth from "./bearer.auth";
import AuthService from "../services/auth.service";

export const authMiddleware = config => async (req, res, next) => {
  const authStrategy = new BearerAuth(config, new AuthService(config));
  authStrategy
    .auth(req.headers["authorization"])
    .then(() => next())
    .catch(err => next(err));
};
