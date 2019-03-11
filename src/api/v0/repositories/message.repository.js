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
        //TODO: This could be tested
        if (err.errno === SQLITE_CONTRAINT_ERRNO) {
          throw new EntityNotFoundException("User", `${message.sender} or ${message.recipient}`);
        }
        throw new Error(err);
      });
  }

  getAll(recipientId, starterId, limit) {
    return this.schema
      .select(
        "id",
        "sender",
        "recipient",
        "type",
        "text",
        "url",
        "width",
        "height",
        "source",
        "created_at"
      )
      .where("recipient", recipientId)
      .andWhere("id", ">=", starterId)
      .limit(limit)
      .then(messages => messages.map(message => this.mapper.toDomain(message)));
  }
}

export default MessageRepository;
