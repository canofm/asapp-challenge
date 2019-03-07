import { expect } from "chai";
import sinon from "sinon";
import UserRepository from "../user.repository";
import UserMapper from "../../mappers/user.mapper";
import { Promise } from "bluebird";
import User from "../../../../domain/user";

describe("UserRepository", () => {
  describe("on create", () => {
    it("should call schema's insert with the user to persist and then returns our domain's user", async () => {
      const user = new User.Builder()
        .username("aName")
        .password("hashedPassword")
        .build();

      const id = 1;
      const userFromModel = Object.assign({}, user, { id });
      const userMapper = new UserMapper();
      const insert = sinon
        .stub()
        .withArgs()
        .returns(new Promise((resolve, reject) => resolve(userFromModel))); //eslint-disable-line
      const userRepository = new UserRepository(userMapper, { insert });

      const userCreated = await userRepository.create(user);
      expect(userCreated.username).to.be.eql(user.username);
      expect(userCreated.password).to.be.eql(user.password);
      expect(userCreated.id).to.be.eql(id);
    });
  });
});
