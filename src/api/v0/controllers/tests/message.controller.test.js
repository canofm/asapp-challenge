import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { Promise } from "bluebird";
import app from "../../../../server";
import config from "../../../../config";
import { connect as db } from "../../../../db";
import { EntityNotFoundException } from "../../../../exceptions";
import logger from "../../../../logger";
import UserAPIFactory from "../../factories/user.api.factory";
import AuthService from "../../services/auth.service";

chai.use(chaiHttp);
const request = appConfig => chai.request(app(appConfig));
const messageURI = `${config.api.baseUri}/messages`;
const messageTable = db()("messages");
const userTable = db()("users");
const authService = new AuthService();

describe("Message API", () => {
  describe("on POST /messages", () => {
    let sender, recipient, bearerToken;
    //FIXME: randomly tests fails because of unique constraint, it seems that we are not waiting for truncate
    afterEach(async () => {
      await messageTable.truncate();
      await userTable.truncate();
    });

    beforeEach(async () => {
      await messageTable.truncate();
      await userTable.truncate();

      const userService = UserAPIFactory.getService();
      const users = [
        { username: "user1", password: "pass1" },
        { username: "user2", password: "pass2" }
      ];
      [sender, recipient] = await Promise.map(users, user => userService.create(user));
      bearerToken = await authService.getNewToken(sender);
    });

    it("if request is correct should create the message and returns status code 200 with its id and timestamp", async () => {
      const content = { type: "text", text: "aText" };
      const { body, ...res } = await request()
        .post(messageURI)
        .set("Authorization", `Bearer ${bearerToken}`)
        .send({ sender: sender.id, recipient: recipient.id, content });

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(body.id).to.be.a("number");
      expect(body.timestamp).to.exist;
    });

    it("if sender/recipient doesnt exists should returns status code 404 with EntityNotFoundException", async () => {
      logger.silent = true;
      const content = { type: "text", text: "aText" };
      const recipientDontExist = 5;
      const { body: error, ...res } = await request()
        .post(messageURI)
        .set("Authorization", `Bearer ${bearerToken}`)
        .send({ sender: sender.id, recipient: recipientDontExist, content });

      expect(res).to.have.status(404);
      expect(res).to.be.json;
      const { message } = new EntityNotFoundException(
        "User",
        `${sender.id} or ${recipientDontExist}`
      );
      expect(error.text).to.be.eql(message.text);
      expect(error.type).to.be.eql(message.type);
      logger.silent = false;
    });
  });
});
