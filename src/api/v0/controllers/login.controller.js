import { props } from "bluebird";

export default class Login {
  constructor(AuthService, UserMapper, UserService) {
    this.authService = AuthService;
    this.userMapper = UserMapper;
    this.userService = UserService;
  }

  login(req, res, next) {
    return this.userMapper
      .toDomainAsync(req.body)
      .then(user => props({ userDb: this.userService.getUser(user.username), user }))
      .tap(({ userDb, user }) => this.authService.checkPassword(user.password, userDb.password))
      .then(({ userFromDb }) => this.authService.getNewToken(userFromDb))
      .then(payload => res.status(200).json(payload))
      .catch(err => next(err));
  }
}
