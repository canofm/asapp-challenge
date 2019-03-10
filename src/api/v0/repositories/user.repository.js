class UserRepository {
  constructor(mapper, schema) {
    this.mapper = mapper;
    this.schema = schema;
  }

  create(user) {
    const userModel = this.mapper.toModel(user);
    return this.schema.insert(userModel).then(([id]) => ({ id }));
  }
}

export default UserRepository;
