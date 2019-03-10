import VideoMessage from "../../../domain/video.message";

class VideoMessageMapper {
  toDomain({ sender, recipient, content }) {
    return new VideoMessage.Builder()
      .sender(sender)
      .recipient(recipient)
      .url(content.url)
      .source(content.source)
      .build();
  }
}

export default VideoMessageMapper;
