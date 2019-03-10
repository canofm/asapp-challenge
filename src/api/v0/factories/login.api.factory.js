import LoginController from "../controllers/login.controller";
import UserMapper from "../mappers/user.mapper";
import AuthService from "../services/auth.service";
import UserAPIFactory from "./user.api.factory";

const userMapper = new UserMapper();

class LoginAPIFactory {
  static getController(overrides = {}) {
    const userService = UserAPIFactory.getService(overrides);
    const authService = this.getAuthService(overrides);
    return new LoginController(authService, userService, userMapper);
  }

  static getAuthService({ authService }) {
    return authService ? authService : new AuthService();
  }
}

export default LoginAPIFactory;
