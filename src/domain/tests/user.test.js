import { expect } from "chai";
import User from "../user";
import { PropertyRequiredException, BuilderException } from "../../exceptions";

describe("User", () => {
  describe("while building", () => {
    const name = "aName";
    const password = "aPassword";

    it("must have a username", () => {
      expect(() => new User.Builder().password(password).build()).to.throw(
        PropertyRequiredException
      );
    });

    it("must have a password", () => {
      expect(() => new User.Builder().username(name).build()).to.throw(PropertyRequiredException);
    });

    it("must be created through builder", () => {
      expect(() => new User()).to.throw(BuilderException);
    });

    it("if it has every required property should be ok", () => {
      const id = 1;
      const user = new User.Builder()
        .username(name)
        .password(password)
        .id(id)
        .build();

      expect(user.username).to.be.eql(name);
      expect(user.password).to.be.eql(password);
      expect(user.id).to.be.eql(id);
    });
  });
});
