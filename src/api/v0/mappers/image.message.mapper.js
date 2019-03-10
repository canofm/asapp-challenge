import ImageMessage from "../../../domain/image.message";

class ImageMessageMapper {
  toDomain({ sender, recipient, content }) {
    return new ImageMessage.Builder()
      .sender(sender)
      .recipient(recipient)
      .url(content.url)
      .width(content.width)
      .height(content.height)
      .build();
  }
}

export default ImageMessageMapper;
