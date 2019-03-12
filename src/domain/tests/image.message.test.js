import { expect } from "chai";
import ImageMessage from "../image.message";
import { types } from "../message";
import { PropertyRequiredException, BuilderException } from "../../exceptions";

describe("ImageMessage", () => {
  describe("while building", () => {
    const sender = 1;
    const recipient = 2;
    const url = "https://aUrl.com/image.jpg";
    const height = 100;
    const width = 150;

    it("an url must not be empty", () => {
      expect(() =>
        new ImageMessage.Builder()
          .sender(sender)
          .recipient(recipient)
          .build()
      ).to.throw(PropertyRequiredException);
    });

    it("must be created through builder", () => {
      expect(() => new ImageMessage()).to.throw(BuilderException);
    });

    it("if it has every required property should be ok", () => {
      const id = 1;
      const imageMessage = new ImageMessage.Builder()
        .sender(sender)
        .recipient(recipient)
        .url(url)
        .width(width)
        .height(height)
        .id(id)
        .build();

      expect(imageMessage.sender).to.be.eql(sender);
      expect(imageMessage.recipient).to.be.eql(recipient);
      expect(imageMessage.content.url).to.be.eql(url);
      expect(imageMessage.content.height).to.be.eql(height);
      expect(imageMessage.content.width).to.be.eql(width);
      expect(imageMessage.id).to.be.eql(id);
      expect(imageMessage.content.type).to.be.eql(types.IMAGE);
    });
  });
});
