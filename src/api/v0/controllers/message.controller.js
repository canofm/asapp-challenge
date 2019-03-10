export default class MessageController {
  constructor(messageService, messageMapper) {
    this.messageService = messageService;
    this.messageMapper = messageMapper;
  }

  create(req, res, next) {
    return this.messageMapper
      .toDomainAsync(req.body)
      .then(message => this.messageService.create(message))
      .then(messageCreated =>
        res.status(200).json({ id: messageCreated.id, timestamp: messageCreated.created_at })
      )
      .catch(err => next(err));
  }
}
