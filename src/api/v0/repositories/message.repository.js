import { EntityNotFoundException, SQLITE_CONTRAINT_ERRNO } from "../../../exceptions";

class MessageRepository {
  constructor(mapper, schema) {
    this.mapper = mapper;
    this.schema = schema;
  }

  create(message) {
    const messageModel = this.mapper.toModel(message);
    const timestamp = new Date().toISOString();
    return this.schema
      .insert(messageModel)
      .then(([id]) => ({ id, timestamp }))
      .catch(err => {
        if (err.errno === SQLITE_CONTRAINT_ERRNO) {
          throw new EntityNotFoundException("User", `${message.sender} or ${message.recipient}`);
        }
        throw new Error(err);
      });
  }
}

export default MessageRepository;
