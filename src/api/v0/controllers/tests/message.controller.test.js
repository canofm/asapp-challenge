import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { Promise } from "bluebird";
import app from "../../../../server";
import config from "../../../../config";
import { connect as db } from "../../../../db";
import {
  EntityNotFoundException,
  UnsupportedMessageTypeException,
  MessageMustHaveAContentException
} from "../../../../exceptions";
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
    afterEach(async () => await Promise.all([messageTable.truncate(), userTable.truncate()]));

    beforeEach(async () => {
      await Promise.all([messageTable.truncate(), userTable.truncate()]);

      const userService = UserAPIFactory.getService();
      const users = [
        { username: "user1", password: "pass1" },
        { username: "user2", password: "pass2" }
      ];
      [sender, recipient] = await Promise.mapSeries(users, user => userService.create(user));
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

    it("if sender/recipient does not exists should returns status code 404 with EntityNotFoundException", async () => {
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
        "Message",
        `${sender.id} or ${recipientDontExist}`
      );
      expect(error.text).to.be.eql(message.text);
      expect(error.type).to.be.eql(message.type);
      logger.silent = false;
    });

    it("if message type is not supported should returns status code 400 with UnsupportedMessageTypeException", async () => {
      logger.silent = true;
      const type = "unsupportedType";
      const content = { type, otherProperty: "aText" };
      const { body: error, ...res } = await request()
        .post(messageURI)
        .set("Authorization", `Bearer ${bearerToken}`)
        .send({ sender: sender.id, recipient: recipient, content });

      expect(res).to.have.status(400);
      expect(res).to.be.json;
      const { message } = new UnsupportedMessageTypeException(type);
      expect(error.text).to.be.eql(message.text);
      expect(error.type).to.be.eql(message.type);
      logger.silent = false;
    });

    it("if request doesnt have a content should returns status code 400 with MessageMustHaveAContentException", async () => {
      logger.silent = true;
      const { body: error, ...res } = await request()
        .post(messageURI)
        .set("Authorization", `Bearer ${bearerToken}`)
        .send({ sender: sender.id, recipient: recipient });

      expect(res).to.have.status(400);
      expect(res).to.be.json;
      const { message } = new MessageMustHaveAContentException();
      expect(error.text).to.be.eql(message.text);
      expect(error.type).to.be.eql(message.type);
      logger.silent = false;
    });
  });
});
