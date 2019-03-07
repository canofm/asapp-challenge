class UserService {
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  create(user) {
    const hashedPassword = this.authService.encrypt(user.password);
    user.password = hashedPassword;
    return this.userRepository.create(user);
  }
}

export default UserService;
