import sinon from "sinon";
import { expect } from "chai";
import MessageMapper from "../message.mapper";
import {
  MessageMustHaveAContentException,
  PropertyRequiredException,
  UnsupportedMessageTypeException
} from "../../../../exceptions";
import { types } from "../../../../domain/message";

describe("MessageMapper", () => {
  describe("toDomain", () => {
    it("if model is missing should throws PropertyRequiredException", () => {
      expect(() => new MessageMapper().toDomain()).to.throw(PropertyRequiredException);
    });

    it("if content is missing should throws MessageMustHaveAContentException", () => {
      expect(() => new MessageMapper().toDomain({})).to.throw(MessageMustHaveAContentException);
    });

    it("if type is not supported should throws UnsupportedMessageTypeException", () => {
      const message = { content: { type: "unsupportedType" } };
      expect(() => new MessageMapper().toDomain(message)).to.throw(UnsupportedMessageTypeException);
    });

    it("if model is correct should call toDomain method for of the mapper", () => {
      const supportedType = "text";
      const toDomain = () => {};
      const fakeTextMessageMapper = { toDomain };
      const messageMapper = new MessageMapper(new Map().set(types.TEXT, fakeTextMessageMapper));
      const message = { sender: 1, recipient: 2, content: { type: supportedType, text: "aText" } };

      const mockTextMessageMapper = sinon
        .mock(fakeTextMessageMapper)
        .expects("toDomain")
        .withExactArgs(message);

      messageMapper.toDomain(message);
      mockTextMessageMapper.verify();
    });
  });
});
