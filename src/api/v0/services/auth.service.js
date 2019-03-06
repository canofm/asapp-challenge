import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config";
import * as Promise from "bluebird";

class AuthService {
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
        config.secrets.jwt,
        {
          expiresIn: config.secrets.jwtExp
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
      jwt.verify(token, config.secrets.jwt, (err, payload) => {
        if (err) return reject(err);
        resolve(payload);
      });
    });
  }
}

export default AuthService;
