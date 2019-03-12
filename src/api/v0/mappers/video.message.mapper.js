import VideoMessage from "../../../domain/video.message";
import MapperInterface from "./mapper.interface";

class VideoMessageMapper extends MapperInterface {
  toDomain({ updated_at, id, sender, recipient, url, source }) {
    return new VideoMessage.Builder()
      .sender(sender)
      .recipient(recipient)
      .url(url)
      .source(source)
      .id(id)
      .timestamp(updated_at)
      .build();
  }

  toModel({ sender, recipient, content }) {
    const timestamp = new Date().toISOString();
    return {
      sender,
      recipient,
      url: content.url,
      source: content.source,
      type: content.type,
      created_at: timestamp,
      updated_at: timestamp
    };
  }
}

export default VideoMessageMapper;
