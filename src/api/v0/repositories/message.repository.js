class MessageRepository {
  constructor(mapper, schema) {
    this.mapper = mapper;
    this.schema = schema;
  }

  create(message) {
    const messageModel = this.mapper.toModel(message);
    const timestamp = new Date().toISOString();
    return this.schema.insert(messageModel).then(([id]) => ({ id, timestamp }));
  }
}

export default MessageRepository;
