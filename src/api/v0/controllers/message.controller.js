export default class MessageController {
  constructor(service, mapper) {
    this.service = service;
    this.mapper = mapper;
  }

  create(req, res, next) {
    return this.mapper
      .toDomainAsync(req.body)
      .then(message => this.service.create(message))
      .then(messageCreated => res.status(200).json(messageCreated))
      .catch(err => next(err));
  }

  fetchAllWithin(req, res, next) {
    const { recipient, start, limit } = req.body;
    return this.service
      .fetchAllWithin(recipient, start, limit)
      .then(messages => res.status(200).json(messages))
      .catch(err => next(err));
  }
}
