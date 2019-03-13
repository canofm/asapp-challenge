import { expect } from "chai";
import sinon from "sinon";
import MessageService from "../message.service";
import { FetchRequiredArgumentException } from "../../../../exceptions";

describe("MessageService", () => {
  describe("fetchAllWithin", () => {
    it("if recipient is not defined, should throw FetchRequiredArgumentException", () => {
      const messageService = new MessageService({});
      expect(() => messageService.fetchAllWithin(undefined, 1)).throw(
        FetchRequiredArgumentException
      );
    });

    it("if starter message id not defined, should throw FetchRequiredArgumentException", () => {
      const messageService = new MessageService({});
      expect(() => messageService.fetchAllWithin(1, undefined)).throw(
        FetchRequiredArgumentException
      );
    });

    it("if recipient and started message are defined, should call message repository", async () => {
      const recipientId = 1;
      const starterMessage = 3;
      const getAll = () => Promise.resolve();
      const fakeMessageRepository = { getAll };
      const messageService = new MessageService(fakeMessageRepository);

      const messageRepositoryMock = sinon
        .mock(fakeMessageRepository)
        .expects("getAll")
        .withExactArgs(recipientId, starterMessage, 100);

      await messageService.fetchAllWithin(recipientId, starterMessage);
      messageRepositoryMock.verify();
    });
  });
});
