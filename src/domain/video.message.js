import { isEmpty } from "lodash";
import { PropertyRequiredException, BuilderException } from "../exceptions";
import Message, { types } from "./message";

class VideoMessage extends Message {
  constructor(build) {
    if (!build) {
      throw new BuilderException("VideoMessage");
    }

    super(build, types.VIDEO);
    this.url = build._url;
    this.source = build._source;
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
          throw new PropertyRequiredException("VideoMessage", "source"); //TODO: enum exception!
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
  VIDEO: "vimeo"
};
