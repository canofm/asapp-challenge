import Auth from "../auth";
import sinon from "sinon";
import AuthService from "../../services/auth.service";
import {
  AuthorizationRequiredException,
  UnsupportedAuthorizationMethodException
} from "../../../../exceptions";

describe("Auth", () => {
  describe("if header is correct", () => {
    it("if token is valid, then should authorize the request", done => {
      const verifyToken = sinon
        .stub()
        .withArgs(sinon.match.same("validToken"))
        .returns(Promise.resolve());

      const authService = { verifyToken };
      const auth = new Auth(authService);

      auth.auth("Bearer validToken").then(() => done());
    });

    it("if token is invalid, should raise AuthorizationRequiredException", done => {
      const verifyToken = sinon
        .stub()
        .withArgs("invalidToken")
        .returns(Promise.reject());

      const authService = { verifyToken };
      const auth = new Auth(authService);

      auth.auth("Bearer invalidToken").catch(AuthorizationRequiredException, () => done());
    });

    it("if authorization method is not supported, should throws UnsupportedAuthorizationMethodException", done => {
      const verifyToken = sinon
        .stub()
        .withArgs("someToken")
        .returns(Promise.resolve());

      const authService = { verifyToken };
      const auth = new Auth(authService);

      auth
        .auth("UnsupportedMethod someToken")
        .catch(UnsupportedAuthorizationMethodException, () => done());
    });
  });

  describe("if header is missing", () => {
    it("should raise AuthorizationRequiredException", done => {
      const auth = new Auth(new AuthService());
      auth.auth().catch(AuthorizationRequiredException, () => done());
    });
  });
});
