import TextMessage from "../../../domain/text.message";

class TextMessageMapper {
  toDomain({ sender, recipient, content }) {
    return new TextMessage.Builder()
      .sender(sender)
      .recipient(recipient)
      .text(content.text)
      .build();
  }
}

export default TextMessageMapper;
