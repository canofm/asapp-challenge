import { isEmpty } from "lodash";
import { PropertyRequiredException, BuilderException } from "../exceptions";
import Message, { types } from "./message";

class TextMessage extends Message {
  constructor(build) {
    if (!build) {
      throw new BuilderException("TextMessage");
    }

    super(build, types.TEXT);
    this.content.text = build._text;
  }

  static get Builder() {
    class Builder extends Message.Builder {
      text(text) {
        this._text = text;
        return this;
      }

      build() {
        super.build();
        if (isEmpty(this._text)) {
          throw new PropertyRequiredException("TextMessage", "text"); //TODO: exception cannot send blank message
        }

        return new TextMessage(this);
      }
    }
    return Builder;
  }
}

export default TextMessage;
