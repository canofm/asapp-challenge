import { isEmpty } from "lodash";
import { PropertyRequiredException, BuilderException } from "../exceptions";
import Message, { types } from "./message";

class ImageMessage extends Message {
  constructor(build) {
    if (!build) {
      throw new BuilderException("ImageMessage");
    }

    super(build, types.IMAGE);
    this.url = build._url;
    this.height = build._height;
    this.width = build._width;
  }

  static get Builder() {
    class Builder extends Message.Builder {
      url(url) {
        this._url = url;
        return this;
      }

      height(height) {
        this._height = height;
        return this;
      }

      width(width) {
        this._width = width;
        return this;
      }

      build() {
        super.build();
        if (isEmpty(this._url)) {
          throw new PropertyRequiredException("ImageMessage", "url");
        }

        return new ImageMessage(this);
      }
    }
    return Builder;
  }
}

export default ImageMessage;
