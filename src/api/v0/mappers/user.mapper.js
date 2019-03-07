import User from "../../../domain/user";

class UserMapper {
  toModel(entity) {
    return new User.Builder()
      .username(entity.username)
      .password(entity.password)
      .build();
  }

  toDomain(model) {
    return new User.Builder()
      .username(model.username)
      .password(model.password)
      .id(model.id)
      .build();
  }
}

export default UserMapper;
