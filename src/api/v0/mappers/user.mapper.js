import User from "../../../domain/user";
import { method } from "bluebird";

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

  toDomainAsync(model) {
    return method(this.toDomain)(model);
  }
}

export default UserMapper;
