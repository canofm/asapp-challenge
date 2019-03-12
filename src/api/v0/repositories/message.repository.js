import { EntityNotFoundException, SQLITE_CONSTRAINT_ERRNO } from "../../../exceptions";

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
        if (err.errno === SQLITE_CONSTRAINT_ERRNO) {
          throw new EntityNotFoundException("Message", `${message.sender} or ${message.recipient}`);
        }
        throw new Error(err);
      });
  }

  getAll(recipientId, starterId, limit) {
    return this.schema
      .where("recipient", recipientId)
      .andWhere("id", 1)
      .limit(limit)
      .select()
      .then(messages => {
        console.log({ messages });
        return messages.map(message => this.mapper.toDomain(message));
      });
  }
}

export default MessageRepository;
