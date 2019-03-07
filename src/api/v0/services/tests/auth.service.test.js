import { expect } from "chai";
import jwt from "jsonwebtoken";
import AuthService from "../auth.service";
import User from "../../../../domain/user";
import { LoginException } from "../../../../exceptions";

describe("AuthService", () => {
  let authService;
  const config = { secrets: { jwt: "privateKey", jwtExp: "100d" } };
  const user = new User.Builder()
    .username("aName")
    .password("aPassword")
    .id(1)
    .build();

  beforeEach(() => {
    authService = new AuthService(config);
  });

  describe("newToken", () => {
    it("creates new jwt from user", async () => {
      const token = await authService.getNewToken(user);
      const payload = jwt.verify(token, config.secrets.jwt);

      expect(payload.id).to.be.eql(user.id);
    });
  });

  describe("verifyToken", () => {
    it("validates jwt and returns payload", async () => {
      const token = jwt.sign({ id: user.id }, config.secrets.jwt);
      const payload = await authService.verifyToken(token);

      expect(payload.id).to.be.eql(user.id);
    });
  });

  describe("encrypt password", () => {
    it("should check password", async () => {
      const password = "aPasswd";
      const hashedPassword = await authService.encrypt(password);
      await authService.checkPassword(hashedPassword, password);
    });

    it("shouldn't check password", async () => {
      const hashedPassword = await authService.encrypt("aPasswd");

      await authService
        .checkPassword(hashedPassword, "otherPassword")
        .catch(LoginException, () => {});
    });
  });
});
