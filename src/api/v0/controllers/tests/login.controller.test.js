import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../../server";
import config from "../../../../config";
// import { EntityNotFoundException } from "../../../../exceptions";
import { connect as db } from "../../../../db";
import AuthService from "../../services/auth.service";

chai.use(chaiHttp);
const request = appConfig => chai.request(app(appConfig));
const loginURI = `${config.api.baseUri}/login`;
const userTable = db()("users");

describe("Login API", () => {
  describe("on POST /login", () => {
    beforeEach(async () => await userTable.truncate());

    it("if user and password are correct, should returns status code 200 with its id with the token", async () => {
      const authService = new AuthService();
      const username = "root";
      const originalPassword = "aPassword";
      const password = await authService.encrypt(originalPassword);
      const [id] = await userTable.insert({ username, password });

      const { body, ...res } = await request()
        .post(loginURI)
        .send({ username, password: originalPassword });

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(body.id).to.be.eql(id);
      expect(body.token).to.be.a("string");
    });

    it("if user doesnt match with password, should returns status code 401 with login fail message", () => {});

    it("if user doesnt exists, should returns status code 404 with not entity not found message", () => {});
  });
});
