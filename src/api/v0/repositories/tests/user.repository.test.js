import { expect } from "chai";
import sinon from "sinon";
import UserRepository from "../user.repository";
import UserMapper from "../../mappers/user.mapper";
import { Promise } from "bluebird";
import User from "../../../../domain/user";

describe("UserRepository", () => {
  const userMapper = new UserMapper();
  describe("on create", () => {
    it("should calls schema's insert with the user to persist and returns its id", async () => {
      const user = new User.Builder()
        .username("aName")
        .password("hashedPassword")
        .build();

      const userModel = userMapper.toModel(user);
      const id = 1;
      const insert = sinon
        .stub()
        .withArgs(userModel)
        .returns(Promise.resolve([id]));
      const userRepository = new UserRepository(userMapper, { insert });

      const userCreated = await userRepository.create(user);
      expect(userCreated.id).to.be.eql(id);
    });
  });

  describe("on getByUsername", () => {
    it("should calls schema's select with the username and returns the domain user if exists", async () => {
      const username = "anUsername";
      const user = new User.Builder()
        .username(username)
        .password("hashedPassword")
        .id(1)
        .build();

      const where = sinon
        .stub()
        .withArgs("username", username)
        .returns(Promise.resolve(user));

      const select = sinon
        .stub()
        .withArgs("id", "username", "password")
        .returns({ where });

      const userRepository = new UserRepository(userMapper, { select });

      const userFound = await userRepository.getByUsername(username);
      expect(userFound.username).to.be.eql(username);
      expect(userFound.password).to.be.a("string");
      expect(userFound.id).to.be.a("number");
    });

    it("should calls schema's select with the username and throw UserDoesNotExistsException", () => {});
  });
});
