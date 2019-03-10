import ImageMessage from "../../../domain/image.message";
import MapperInterface from "./mapper.interface";

class ImageMessageMapper extends MapperInterface {
  toDomain({ sender, recipient, content }) {
    return new ImageMessage.Builder()
      .sender(sender)
      .recipient(recipient)
      .url(content.url)
      .width(content.width)
      .height(content.height)
      .build();
  }

  toModel({ sender, recipient, type, url, width, height }) {
    return { sender, recipient, type, url, width, height };
  }
}

export default ImageMessageMapper;
