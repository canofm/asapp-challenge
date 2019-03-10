import User from "../../../domain/user";
import { method } from "bluebird";
import MapperInterface from "./mapper.interface";

class UserMapper extends MapperInterface {
  toModel({ username, password }) {
    return { username, password };
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
