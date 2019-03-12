import ImageMessage from "../../../domain/image.message";
import MapperInterface from "./mapper.interface";

class ImageMessageMapper extends MapperInterface {
  toDomain({ updated_at, id, sender, recipient, url, width, height }) {
    return new ImageMessage.Builder()
      .sender(sender)
      .recipient(recipient)
      .url(url)
      .width(width)
      .height(height)
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
      url: content.url,
      width: content.width,
      height: content.height,
      created_at: timestamp,
      updated_at: timestamp
    };
  }
}

export default ImageMessageMapper;
