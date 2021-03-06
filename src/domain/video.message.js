import { isEmpty } from "lodash";
import { PropertyRequiredException, BuilderException, EnumException } from "../exceptions";
import Message, { types } from "./message";

class VideoMessage extends Message {
  constructor(build) {
    if (!build) {
      throw new BuilderException("VideoMessage");
    }

    super(build, types.VIDEO);
    this.content.url = build._url;
    this.content.source = build._source;
  }

  static get Builder() {
    class Builder extends Message.Builder {
      url(url) {
        this._url = url;
        return this;
      }

      source(source) {
        this._source = source;
        return this;
      }

      build() {
        super.build();
        if (isEmpty(this._url)) {
          throw new PropertyRequiredException("VideoMessage", "url");
        }
        if (!Object.values(sources).includes(this._source)) {
          throw new EnumException("source", this._source);
        }
        return new VideoMessage(this);
      }
    }
    return Builder;
  }
}

export default VideoMessage;

export const sources = {
  YOUTUBE: "youtube",
  VIMEO: "vimeo"
};
