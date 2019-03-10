class UserService {
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  create(user) {
    return this.authService
      .encrypt(user.password)
      .then(password => Object.assign(user, { password }))
      .then(userHashed => this.userRepository.create(userHashed));
  }
}

export default UserService;
