import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../../server";
import config from "../../../../config";
import User from "../../../../domain/user";
import { connect as db } from "../../../../db";
import { PropertyRequiredException, DuplicatedEntityException } from "../../../../exceptions";
import { console } from "../../../../logger";

chai.use(chaiHttp);
const request = () => chai.request(app());
const userURI = `${config.api.baseUri}/users`;

describe("User API", () => {
  describe("on POST /users", () => {
    beforeEach(async () => await db()("users").truncate());
    it("should returns 200 with the user's id just created", async () => {
      const user = new User.Builder()
        .username("aName")
        .password("aPassword")
        .build();

      const { body, ...res } = await request()
        .post(userURI)
        .send(user);

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(body.id).to.be.a("number");
      expect(body.id).to.be.eql(1);
    });

    it("when body sent is incomplete, it shoulds return 400", async () => {
      console.silent = true;
      const { body: error, ...res } = await request()
        .post(userURI)
        .send({ username: "anUserName" });

      expect(res).to.have.status(400);
      const { message } = new PropertyRequiredException("User", "password");
      expect(error.text).to.be.eql(message.text);
      expect(error.type).to.be.eql(message.type);
      console.silent = false;
    });

    it("when trying to create an user that already exists, should returns 409", async () => {
      console.silent = true;
      const username = "anUsername";
      const password = "aPassword";

      await request()
        .post(userURI)
        .send({ username, password });

      const { body: error, ...res } = await request()
        .post(userURI)
        .send({ username, password });

      expect(res).to.have.status(409);
      expect(res).to.be.json;
      const { message } = new DuplicatedEntityException();
      expect(error.text).to.be.eql(message.text);
      expect(error.type).to.be.eql(message.type);
      console.silent = false;
    });
  });
});
