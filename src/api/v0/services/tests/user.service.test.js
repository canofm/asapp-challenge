import sinon from "sinon";
import UserService from "../user.service";
import User from "../../../../domain/user";

describe("UserService", () => {
  describe("on create", () => {
    it("should set the encrypt passwd in the user and then pass it to the repository", async () => {
      const oldPassword = "aPassword";
      const newPassword = "hashedPassword";
      const encrypt = sinon
        .stub()
        .withArgs(oldPassword)
        .returns(Promise.resolve(newPassword));

      const userExpected = new User.Builder()
        .username("aName")
        .password(newPassword)
        .build();

      const authServiceFake = { encrypt };
      const userRepositoryFake = { create: () => {} };
      const userService = new UserService(userRepositoryFake, authServiceFake);

      const userRepositoryMock = sinon
        .mock(userRepositoryFake)
        .expects("create")
        .withExactArgs(userExpected);

      const newUser = new User.Builder()
        .username("aName")
        .password(oldPassword)
        .build();

      await userService.create(newUser);

      userRepositoryMock.verify();
    });
  });
});
