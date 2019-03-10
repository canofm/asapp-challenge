import { types } from "../../../domain/message";
import { method } from "bluebird";
import {
  MessageMustHaveAContentException,
  UnsupportedMessageTypeException,
  PropertyRequiredException
} from "../../../exceptions";
import TextMessageMapper from "./text.message.mapper";
import ImageMessageMapper from "./image.message.mapper";
import VideoMessageMapper from "./video.message.mapper";

class MessageMapper {
  constructor(mappers = null) {
    if (mappers) {
      this.mappers = mappers;
    } else {
      this.mappers = new Map()
        .set(types.TEXT, new TextMessageMapper())
        .set(types.IMAGE, new ImageMessageMapper())
        .set(types.VIDEO, new VideoMessageMapper());
    }
  }

  toModel({ sender, recipient }) {
    return { sender, recipient };
  }

  toDomain(model) {
    if (!model) {
      throw new PropertyRequiredException("Message", "content");
    }
    if (!model.content) {
      throw new MessageMustHaveAContentException();
    }
    if (!this.mappers.has(model.content.type)) {
      throw new UnsupportedMessageTypeException(model.content.type);
    }

    const mapper = this.mappers.get(model.content.type);
    return mapper.toDomain(model);
  }

  toDomainAsync(model) {
    return method(this.toDomain)(model);
  }
}

export default MessageMapper;
