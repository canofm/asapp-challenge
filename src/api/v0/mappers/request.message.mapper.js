import MessageMapper from "./message.mapper";
import { PropertyRequiredException, MessageMustHaveAContentException } from "../../../exceptions";

class RequestMessageMapper extends MessageMapper {
  toDomain(message) {
    if (!message) {
      throw new PropertyRequiredException("Message", "content");
    }

    if (!message.content) {
      throw new MessageMustHaveAContentException();
    }
    const { sender, recipient } = message;
    const { type, text, url, width, height, source } = message.content;

    return super.toDomain({ sender, recipient, type, text, url, width, height, source });
  }
}

export default RequestMessageMapper;
