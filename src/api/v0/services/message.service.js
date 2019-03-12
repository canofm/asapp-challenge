import { FetchRequiredArgumentException } from "../../../exceptions";

class MessageService {
  constructor(repository) {
    this.repository = repository;
  }

  create(message) {
    return this.repository.create(message);
  }

  fetchAllWithin(userId, starterId, limit = 100) {
    //TODO: probably from config
    if (!userId) {
      throw new FetchRequiredArgumentException("recipient id");
    }
    if (!starterId) {
      throw new FetchRequiredArgumentException("starter message id");
    }

    return this.repository.getAll(userId, starterId, limit);
  }
}

export default MessageService;
