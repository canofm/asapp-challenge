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
      .then(user => props({ userFromDb: this.userService.getUser(user.id), user }))
      .tap(({ userFromDb, user }) =>
        this.authService.checkPassword(userFromDb.password, user.password)
      )
      .then(({ userFromDb }) => this.authService.getNewToken(userFromDb))
      .then(payload => res.status(200).json(payload))
      .catch(err => next(err));
  }
}
