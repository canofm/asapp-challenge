import { props } from "bluebird";

export default class Login {
  constructor(authService, userService, userMapper) {
    this.authService = authService;
    this.userService = userService;
    this.userMapper = userMapper;
  }

  login(req, res, next) {
    return this.userMapper
      .toDomainAsync(req.body)
      .then(user => props({ userDb: this.userService.getByUsername(user.username), user }))
      .tap(({ userDb, user }) => this.authService.checkPassword(user.password, userDb.password))
      .then(({ userDb }) => props({ id: userDb.id, token: this.authService.getNewToken(userDb) }))
      .then(payload => res.status(200).json(payload))
      .catch(err => next(err));
  }
}
