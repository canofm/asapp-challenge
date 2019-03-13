import {
  EntityNotFoundException,
  SQLITE_CONSTRAINT_ERRNO,
  DuplicatedEntityException
} from "../../../exceptions";

class UserRepository {
  constructor(mapper, schema) {
    this.mapper = mapper;
    this.schema = schema;
  }

  create(user) {
    const userModel = this.mapper.toModel(user);
    return this.schema()
      .insert(userModel)
      .then(([id]) => ({ id }))
      .catch(err => {
        if (err.errno === SQLITE_CONSTRAINT_ERRNO) {
          throw new DuplicatedEntityException();
        }
        throw Error(err);
      });
  }

  getByUsername(username) {
    return this.schema()
      .select("id", "username", "password")
      .where("username", username)
      .then(([user]) => {
        if (!user) {
          throw new EntityNotFoundException("User", username);
        }
        return this.mapper.toDomain(user);
      });
  }
}

export default UserRepository;
