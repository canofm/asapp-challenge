class MessageService {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  create(message) {
    return this.messageRepository.create(message);
  }
}

export default MessageService;
