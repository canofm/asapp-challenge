import { types } from "../../../domain/message";
import { method } from "bluebird";
import { UnsupportedMessageTypeException } from "../../../exceptions";
import TextMessageMapper from "./text.message.mapper";
import ImageMessageMapper from "./image.message.mapper";
import VideoMessageMapper from "./video.message.mapper";
import MapperInterface from "./mapper.interface";

class MessageMapper extends MapperInterface {
  constructor(mappers = null) {
    super();
    if (mappers) {
      this.mappers = mappers;
    } else {
      this.mappers = new Map()
        .set(types.TEXT, new TextMessageMapper())
        .set(types.IMAGE, new ImageMessageMapper())
        .set(types.VIDEO, new VideoMessageMapper());
    }
  }
  /**
   * @description: map to a persistent entity
   * @param {*} message: this should be a domain message
   */
  toModel(message) {
    if (!this.mappers.has(message.type)) {
      throw new UnsupportedMessageTypeException(message.type);
    }
    const mapper = this.mappers.get(message.type);
    return mapper.toModel(message);
  }

  /**
   * @description: map to a domain entity
   * @param {*} message: this message is the one from the request
   */
  toDomain(message) {
    if (!this.mappers.has(message.type)) {
      throw new UnsupportedMessageTypeException(message.type);
    }

    const mapper = this.mappers.get(message.type);
    return mapper.toDomain(message);
  }

  /**
   * @description: this is just sugar syntax in order to chain promises
   */
  toDomainAsync(message) {
    return method(this.toDomain.bind(this))(message);
  }
}

export default MessageMapper;
