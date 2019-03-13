import { EntityNotFoundException, SQLITE_CONSTRAINT_ERRNO } from "../../../exceptions";
import { Promise } from "bluebird";

class MessageRepository {
  constructor(mapper, schema) {
    this.mapper = mapper;
    this.schema = schema;
  }

  create(message) {
    const messageModel = this.mapper.toModel(message);
    const timestamp = new Date().toISOString();
    return this.schema()
      .insert(messageModel)
      .then(([id]) => ({ id, timestamp }))
      .catch(err => {
        if (err.errno === SQLITE_CONSTRAINT_ERRNO) {
          throw new EntityNotFoundException("Message", `${message.sender} or ${message.recipient}`);
        }
        throw new Error(err);
      });
  }

  getAll(recipient, starterId, limit) {
    return this.schema()
      .where("recipient", recipient.id)
      .andWhere("id", ">=", starterId)
      .select()
      .limit(limit)
      .then(messages => Promise.map(messages, message => this.mapper.toDomain(message)));
  }
}

export default MessageRepository;
