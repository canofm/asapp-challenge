import { merge } from "lodash";

class Exception extends Error {
  constructor(clazz, ...args) {
    super(...args);
    this.message = {};
    Error.captureStackTrace(this, clazz);
  }

  set text(text) {
    merge(this.message, { text });
  }
  set type(type) {
    merge(this.message, { type });
  }
}

export class AuthorizationRequiredException extends Error {
  constructor(...args) {
    super(...args);
    this.statusCode = 403;
    this.header = { "WWW-Authenticate": `Basic realm="Secure Area"` };
    this.message = {
      text: "You need to be authenticate to do this operation",
      type: "authorization_required_exception"
    };
  }
}

export class LoginException extends Error {
  constructor(...args) {
    super(...args);
    this.statusCode = 403;
    this.message = {
      text: "Username or password given didn't match with an existing user.",
      type: "login_exception"
    };
  }
}

export class PropertyRequiredException extends Exception {
  constructor(...args) {
    super(PropertyRequiredException, ...args);
    const entity = args[0];
    const property = args[1];
    this.text = `${entity} must have a ${property}`;
    this.type = "property_required_exception";
    this.statusCode = 400;
  }
}

export class BuilderException extends Exception {
  constructor(...args) {
    super(BuilderException, ...args);
    const entity = args[0];
    this.text = `${entity} must be created through Builder`;
    this.type = "create_without_builder_exception";
    this.statusCode = 500;
  }
}

export class EntityNotFoundException extends Exception {
  constructor(...args) {
    super(EntityNotFoundException, ...args);
    const entity = args[0];
    const id = args[1];
    this.text = `${entity} with id=${id} not found`;
    this.type = "entity_not_found";
    this.statusCode = 404;
  }
}

export class DuplicatedEntityException extends Exception {
  constructor(...args) {
    super(DuplicatedEntityException, ...args);
    this.text = args[0];
    this.type = "duplicated_entity_exception";
    this.statusCode = 409;
  }
}
