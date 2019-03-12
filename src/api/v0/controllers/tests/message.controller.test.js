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
import TextMessage from "../../../../domain/text.message";
import MessageAPIFactory from "../../factories/message.api.factory";

chai.use(chaiHttp);
const request = appConfig => chai.request(app(appConfig));
const messageURI = `${config.api.baseUri}/messages`;
const messageTable = db()("messages");
const userTable = db()("users");
const authService = new AuthService();

describe("Message API", () => {
  describe("on POST /messages", () => {
    let sender, recipient, bearerToken;
    afterEach(async () => await cleanDb());

    beforeEach(async () => {
      await cleanDb();
      [sender, recipient] = await createUsers();
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

  describe("on GET /messages", () => {
    let sender, recipient, token;
    afterEach(async () => await cleanDb());
    beforeEach(async () => {
      await cleanDb();
      [sender, recipient] = await createUsers();
      token = await authService.getNewToken(recipient);
    });

    it("if there is not any messages, should returns an empty array", async () => {
      const { body, ...res } = await request()
        .get(messageURI)
        .set("Authorization", `Bearer ${token}`)
        .query({ recipient, start: 1 });

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(body).to.be.eql([]);
    });

    it("should returns all messages from recipient", async () => {
      const messages = await createMessages(recipient.id, sender.id, 5);
      const { body, ...res } = await request()
        .get(messageURI)
        .set("Authorization", `Bearer ${token}`)
        .query({ recipient, start: 2, limit: 2 });

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      const [message2, message3] = body;
      const [messageExpected2, messageExpected3] = messages.slice(1, 3);

      expect(message2.id).to.be.eql(messageExpected2.id);
      expect(message2.timestamp).to.be.eql(messageExpected2.timestamp);
      expect(message2.sender).to.be.eql(sender.id);
      expect(message2.recipient).to.be.eql(recipient.id);
      expect(message2.content.type).to.be.eql("text");
      expect(message3.id).to.be.eql(messageExpected3.id);
      expect(message3.timestamp).to.be.eql(messageExpected3.timestamp);
      expect(message3.sender).to.be.eql(sender.id);
      expect(message3.recipient).to.be.eql(recipient.id);
      expect(message3.content.type).to.be.eql("text");
    });
  });
});

/** Helpers */

const cleanDb = async () => await Promise.all([messageTable.truncate(), userTable.truncate()]);

const createUsers = async () => {
  const userService = UserAPIFactory.getService();
  const users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" }
  ];
  return await Promise.mapSeries(users, user => userService.create(user));
};

const createMessages = async (recipientId, senderId, n) => {
  let messages = [];
  for (let i = 0; i < n; i++) {
    const message = new TextMessage.Builder()
      .sender(senderId)
      .recipient(recipientId)
      .text("aText")
      .build();
    messages.push(message);
  }
  const messageService = MessageAPIFactory.getService();
  return await Promise.map(messages, message => messageService.create(message));
};
