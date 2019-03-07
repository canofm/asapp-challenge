export default class UserController {
  constructor(userService, userMapper) {
    this.userService = userService;
    this.userMapper = userMapper;
  }

  create(req, res, next) {
    return this.userMapper
      .toDomainAsync(req.body)
      .then(user => this.userService.create(user))
      .then(userCreated => res.status(200).json({ id: userCreated.id }))
      .catch(err => next(err));
  }
}
