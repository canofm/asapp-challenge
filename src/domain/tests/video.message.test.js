import { expect } from "chai";
import VideoMessage, { sources } from "../video.message";
import { types } from "../message";
import { PropertyRequiredException, BuilderException, EnumException } from "../../exceptions";

describe("VideoMessage", () => {
  describe("while building", () => {
    const sender = 1;
    const recipient = 2;
    const url = "https://aUrl.com/image.jpg";

    it("an url must not be empty", () => {
      expect(() =>
        new VideoMessage.Builder()
          .sender(sender)
          .recipient(recipient)
          .build()
      ).to.throw(PropertyRequiredException);
    });

    it("must be created through builder", () => {
      expect(() => new VideoMessage()).to.throw(BuilderException);
    });

    it("the source must one of the sources enum", () => {
      expect(() =>
        new VideoMessage.Builder()
          .sender(sender)
          .recipient(recipient)
          .url(url)
          .source("invalidSource")
          .build()
      ).to.throw(EnumException);
    });

    it("if it has every required property should be ok", () => {
      const id = 1;
      const videoMessage = new VideoMessage.Builder()
        .sender(sender)
        .recipient(recipient)
        .url(url)
        .source(sources.YOUTUBE)
        .id(id)
        .build();

      expect(videoMessage.sender).to.be.eql(sender);
      expect(videoMessage.recipient).to.be.eql(recipient);
      expect(videoMessage.url).to.be.eql(url);
      expect(videoMessage.source).to.be.eql(sources.YOUTUBE);
      expect(videoMessage.id).to.be.eql(id);
      expect(videoMessage.type).to.be.eql(types.VIDEO);
    });
  });
});
