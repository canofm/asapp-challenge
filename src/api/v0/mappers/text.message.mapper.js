import TextMessage from "../../../domain/text.message";
import MapperInterface from "./mapper.interface";

class TextMessageMapper extends MapperInterface {
  toDomain({ updated_at, id, sender, recipient, text }) {
    return new TextMessage.Builder()
      .sender(sender)
      .recipient(recipient)
      .text(text)
      .id(id)
      .timestamp(updated_at)
      .build();
  }

  toModel({ sender, recipient, content }) {
    const timestamp = new Date().toISOString();
    return {
      sender,
      recipient,
      type: content.type,
      text: content.text,
      created_at: timestamp,
      updated_at: timestamp
    };
  }
}

export default TextMessageMapper;
