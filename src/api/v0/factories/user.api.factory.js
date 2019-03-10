import { isEmpty } from "lodash";
import { connect as db } from "../../../db";
import UserRepository from "../repositories/user.repository";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";
import UserMapper from "../mappers/user.mapper";
import AuthService from "../services/auth.service";

const defaultSetup = { db: db()("users") };
const userMapper = new UserMapper();

class UserAPIFactory {
  static getController(overrides = {}) {
    const { authService, ...options } = overrides;
    const repository = this.getRepository(options);
    const service = this.getService(repository, authService);
    return new UserController(service, userMapper);
  }

  static getRepository(overrides = {}) {
    const { db } = Object.assign({}, defaultSetup, overrides);
    return new UserRepository(userMapper, db);
  }

  static getService(repo = null, authService = null) {
    const repository = !isEmpty(repo) ? repo : this.getRepository();
    const service = authService ? authService : new AuthService();
    return new UserService(repository, service);
  }
}

export default UserAPIFactory;
