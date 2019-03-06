import { isEmpty } from "lodash";
import { PropertyRequiredException, BuilderException } from "../exceptions";

class User {
  constructor(build) {
    if (!build) {
      throw new BuilderException("User");
    }

    this.username = build._username;
    this.password = build._password;
    if (build._id) this.id = build._id;
  }

  static get Builder() {
    class Builder {
      username(username) {
        this._username = username;
        return this;
      }

      password(password) {
        this._password = password;
        return this;
      }

      id(id) {
        this._id = id;
        return this;
      }

      build() {
        if (isEmpty(this._username)) {
          throw new PropertyRequiredException("User", "username");
        }

        if (isEmpty(this._password)) {
          throw new PropertyRequiredException("User", "password");
        }

        return new User(this);
      }
    }
    return Builder;
  }
}

export default User;
