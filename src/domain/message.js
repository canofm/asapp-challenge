import { PropertyRequiredException, BuilderException } from "../exceptions";

class Message {
  constructor(build, type) {
    if (!build) {
      throw new BuilderException("Message");
    }
    this.type = type;
    this.sender = build._sender;
    this.recipient = build._recipient;
    if (build._id) this.id = build._id;
  }

  static get Builder() {
    class Builder {
      sender(sender) {
        this._sender = sender;
        return this;
      }

      recipient(recipient) {
        this._recipient = recipient;
        return this;
      }

      id(id) {
        this._id = id;
        return this;
      }

      build() {
        if (!this._sender) {
          throw new PropertyRequiredException("Message", "sender");
        }

        if (!this._recipient) {
          throw new PropertyRequiredException("Message", "recipient");
        }

        return new Message(this);
      }
    }
    return Builder;
  }
}

export default Message;

export const types = {
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video"
};
