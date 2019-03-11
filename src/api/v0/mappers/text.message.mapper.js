import TextMessage from "../../../domain/text.message";
import MapperInterface from "./mapper.interface";

class TextMessageMapper extends MapperInterface {
  toDomain({ sender, recipient, text }) {
    return new TextMessage.Builder()
      .sender(sender)
      .recipient(recipient)
      .text(text)
      .build();
  }

  toModel({ sender, recipient, type, text }) {
    return { sender, recipient, type, text };
  }
}

export default TextMessageMapper;
