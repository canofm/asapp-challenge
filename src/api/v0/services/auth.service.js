import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config";
import { Promise } from "bluebird";

class AuthService {
  constructor(appConfig = config) {
    this.appConfig = appConfig;
  }

  encrypt(password) {
    return bcrypt.hash(password, 8);
  }

  checkPassword(hashedPassword, passwordToCheck) {
    return bcrypt.compare(passwordToCheck, hashedPassword);
  }

  getNewToken(user) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id: user.id },
        this.appConfig.secrets.jwt,
        {
          expiresIn: this.appConfig.secrets.jwtExp
        },
        (err, token) => {
          if (err) {
            return reject(err);
          }
          resolve(token);
        }
      );
    });
  }

  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.appConfig.secrets.jwt, (err, payload) => {
        if (err) return reject(err);
        resolve(payload);
      });
    });
  }
}

export default AuthService;
