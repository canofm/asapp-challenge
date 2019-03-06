import { expect } from "chai";
import TextMessage from "../text.message";
import { types } from "../message";
import { PropertyRequiredException, BuilderException } from "../../exceptions";

describe("TextMessage", () => {
  describe("while building", () => {
    const sender = 1;
    const recipient = 2;
    const text = "aText";

    it("a message text must not be empty", () => {
      expect(() =>
        new TextMessage.Builder()
          .sender(sender)
          .recipient(recipient)
          .build()
      ).to.throw(PropertyRequiredException);
    });

    it("must be created through builder", () => {
      expect(() => new TextMessage()).to.throw(BuilderException);
    });

    it("if it has every required property should be ok", () => {
      const id = 1;
      const textMessage = new TextMessage.Builder()
        .sender(sender)
        .recipient(recipient)
        .text(text)
        .id(id)
        .build();

      expect(textMessage.sender).to.be.eql(sender);
      expect(textMessage.recipient).to.be.eql(recipient);
      expect(textMessage.text).to.be.eql(text);
      expect(textMessage.id).to.be.eql(id);
      expect(textMessage.type).to.be.eql(types.TEXT);
    });
  });
});
