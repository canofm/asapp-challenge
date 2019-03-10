import BearerAuth from "../bearer.auth";
import sinon from "sinon";
import AuthService from "../../services/auth.service";
import { AuthorizationRequiredException } from "../../../../exceptions";

describe("Bearer auth", () => {
  describe("if header is correct", () => {
    it("if token is valid, then should authorize the request", done => {
      const verifyToken = sinon
        .stub()
        .withArgs(sinon.match.same("validToken"))
        .returns(Promise.resolve());

      const authService = { verifyToken };
      const bearerAuth = new BearerAuth(authService);

      bearerAuth.auth("Bearer validToken").then(() => done());
    });

    it("if token is invalid, should raise AuthorizationRequiredException", done => {
      const verifyToken = sinon
        .stub()
        .withArgs("invalidToken")
        .returns(Promise.reject());

      const authService = { verifyToken };
      const bearerAuth = new BearerAuth(authService);

      bearerAuth.auth("Bearer invalidToken").catch(AuthorizationRequiredException, () => done());
    });
  });

  describe("if header is missing", () => {
    it("should raise AuthorizationRequiredException", done => {
      const bearerAuth = new BearerAuth(new AuthService());
      bearerAuth.auth().catch(AuthorizationRequiredException, () => done());
    });
  });
});
