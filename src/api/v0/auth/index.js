import BearerAuth from "./bearer.auth";
import AuthService from "../services/auth.service";

//TODO: Due to it exceeds the complexity, I have to find a way to still be able to test unitary it but without the chain of responsability

export const authMiddleware = config => async (req, res, next) => {
  const authStrategy = new BearerAuth(new AuthService(config), config);
  authStrategy
    .auth(req.headers["authorization"])
    .then(() => next())
    .catch(err => next(err));
};
