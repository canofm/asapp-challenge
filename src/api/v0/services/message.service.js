class MessageService {
  constructor(repository) {
    this.repository = repository;
  }

  create(message) {
    return this.repository.create(message);
  }

  fetchAllWitihin(userId, starterId, limit = 100) {
    //TODO: probably from config
    if (!userId) {
      throw new Error("Fetch all messages required a recipient id");
    }
    if (!starterId) {
      throw new Error("Fetch all messages required a starter message id");
    }

    return this.repository.getAll(userId, starterId, limit);
  }
}

export default MessageService;
