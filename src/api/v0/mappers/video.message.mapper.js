import VideoMessage from "../../../domain/video.message";
import MapperInterface from "./mapper.interface";

class VideoMessageMapper extends MapperInterface {
  toDomain({ sender, recipient, url, source }) {
    return new VideoMessage.Builder()
      .sender(sender)
      .recipient(recipient)
      .url(url)
      .source(source)
      .build();
  }

  toModel({ sender, recipient, content }) {
    return { sender, recipient, url: content.url, source: content.source, type: content.type };
  }
}

export default VideoMessageMapper;
