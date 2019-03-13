import { FetchRequiredArgumentException } from "../../../exceptions";
import config from "../../../config";

class MessageService {
  constructor(repository) {
    this.repository = repository;
  }

  create(message) {
    return this.repository.create(message);
  }

  fetchAllWithin(userId, starterId, limit = config.api.messages.limit) {
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
