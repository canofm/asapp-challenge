import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../../server";
import config from "../../../../config";
import { connect as db } from "../../../../db";
import AuthService from "../../services/auth.service";
import { LoginException, EntityNotFoundException } from "../../../../exceptions";
import logger from "../../../../logger";

chai.use(chaiHttp);
const request = appConfig => chai.request(app(appConfig));
const loginURI = `${config.api.baseUri}/login`;
const userTable = db()("users");
const authService = new AuthService();

describe("Login API", () => {
  describe("on POST /login", () => {
    let username, originalPassword, id;

    beforeEach(async () => {
      await userTable.truncate();
      username = "root";
      originalPassword = "aPassword";
      const password = await authService.encrypt(originalPassword);
      [id] = await userTable.insert({ username, password });
    });

    it("if user and password are correct, should returns status code 200 with its id with the token", async () => {
      const { body, ...res } = await request()
        .post(loginURI)
        .send({ username, password: originalPassword });

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(body.id).to.be.eql(id);
      expect(body.token).to.be.a("string");
    });

    it("if user doesnt match with password, should returns status code 401 with login fail message", async () => {
      logger.silent = true;
      const { body: error, ...res } = await request()
        .post(loginURI)
        .send({ username, password: "otherPassword" });

      expect(res).to.have.status(401);
      expect(res).to.be.json;
      const { message } = new LoginException();
      expect(error.text).to.be.eql(message.text);
      expect(error.type).to.be.eql(message.type);
      logger.silent = false;
    });

    it("if user doesnt exists, should returns status code 404 with not entity not found message", async () => {
      logger.silent = true;
      const otherUsername = "doesntExists";
      const { body: error, ...res } = await request()
        .post(loginURI)
        .send({ username: otherUsername, password: "aPassword" });

      expect(res).to.have.status(404);
      expect(res).to.be.json;
      const { message } = new EntityNotFoundException("User", otherUsername);
      expect(error.text).to.be.eql(message.text);
      expect(error.type).to.be.eql(message.type);
      logger.silent = false;
    });
  });
});
