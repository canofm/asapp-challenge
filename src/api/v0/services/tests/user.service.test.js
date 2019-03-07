import sinon from "sinon";
import UserService from "../user.service";
import User from "../../../../domain/user";

describe("UserService", () => {
  describe("on create", () => {
    it("should set the encrypt passwd in the user and then pass it to the repository", () => {
      const oldPassword = "aPassword";
      const newPassword = "hashedPassowrd";
      const encrypt = sinon
        .stub()
        .withArgs(oldPassword)
        .returns(newPassword);

      const authServiceFake = { encrypt };
      const userRepositoryFake = { create: () => {} };

      const userService = new UserService(userRepositoryFake, authServiceFake);

      const userExpected = new User.Builder()
        .username("aName")
        .password(newPassword)
        .build();

      const userRepositoryMock = sinon
        .mock(userRepositoryFake)
        .expects("create")
        .withExactArgs(userExpected);

      const user = new User.Builder()
        .username("aName")
        .password(oldPassword)
        .build();
      userService.create(user);

      userRepositoryMock.verify();
    });
  });
});
