import sinon from "sinon";
import { expect } from "chai";
import MessageMapper from "../message.mapper";
import {
  MessageMustHaveAContentException,
  PropertyRequiredException,
  UnsupportedMessageTypeException
} from "../../../../exceptions";
import { types } from "../../../../domain/message";
import RequestMessageMapper from "../request.message.mapper";

describe("MessageMapper", () => {
  describe("toDomain", () => {
    it("if model is missing should throws PropertyRequiredException", () => {
      expect(() => new RequestMessageMapper().toDomain()).to.throw(PropertyRequiredException);
    });

    it("if content is missing should throws MessageMustHaveAContentException", () => {
      expect(() => new RequestMessageMapper().toDomain({})).to.throw(
        MessageMustHaveAContentException
      );
    });

    it("if type is not supported should throws UnsupportedMessageTypeException", () => {
      const message = { content: { type: "unsupportedType" } };
      expect(() => new MessageMapper().toDomain(message)).to.throw(UnsupportedMessageTypeException);
    });

    it("if model is correct should call toDomain method of the proper mapper", () => {
      const supportedType = "text";
      const toDomain = () => {};
      const fakeTextMessageMapper = { toDomain };
      const messageMapper = new MessageMapper(new Map().set(types.TEXT, fakeTextMessageMapper));
      const message = { sender: 1, recipient: 2, type: supportedType, text: "aText" };

      const mockTextMessageMapper = sinon
        .mock(fakeTextMessageMapper)
        .expects("toDomain")
        .withExactArgs(message);

      messageMapper.toDomain(message);
      mockTextMessageMapper.verify();
    });
  });

  describe("toModel", () => {
    it("if type is not supported should throws UnsupportedMessageTypeException", () => {
      const message = { content: { type: "unsupportedType" } };
      expect(() => new MessageMapper().toModel(message)).to.throw(UnsupportedMessageTypeException);
    });

    it("if type is supported should call toModel method of the proper mapper", () => {
      const supportedType = "text";
      const toModel = () => {};
      const fakeTextMessageMapper = { toModel };
      const messageMapper = new MessageMapper(new Map().set(types.TEXT, fakeTextMessageMapper));
      const message = { sender: 1, recipient: 2, type: supportedType, text: "aText" };

      const mockTextMessageMapper = sinon
        .mock(fakeTextMessageMapper)
        .expects("toModel")
        .withExactArgs(message);

      messageMapper.toModel(message);
      mockTextMessageMapper.verify();
    });
  });
});
