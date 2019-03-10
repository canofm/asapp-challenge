import TextMessage from "../../../domain/text.message";

class TextMessageMapper {
  toDomain({ sender, recipient, content }) {
    return new TextMessage.Builder()
      .sender(sender)
      .recipient(recipient)
      .text(content.text)
      .build();
  }

  toModel({ sender, recipient, type, text }) {
    return { sender, recipient, type, text };
  }
}

export default TextMessageMapper;
