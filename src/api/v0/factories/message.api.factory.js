import { isEmpty } from "lodash";
import { connect as db } from "../../../db";
import MessageRepository from "../repositories/message.repository";
import MessageService from "../services/message.service";
import MessageController from "../controllers/message.controller";
import MessageMapper from "../mappers/message.mapper";
import RequestMessageMapper from "../mappers/request.message.mapper";

const defaultSetup = { db: db()("messages") };
const messageMapper = new MessageMapper();
const requestMessageMapper = new RequestMessageMapper();
class MessageAPIFactory {
  static getController(overrides = {}) {
    const repository = this.getRepository(overrides);
    const service = this.getService(repository);
    return new MessageController(service, requestMessageMapper);
  }

  static getRepository(overrides = {}) {
    const { db } = Object.assign({}, defaultSetup, overrides);
    return new MessageRepository(messageMapper, db);
  }

  static getService(repo = null) {
    const repository = !isEmpty(repo) ? repo : this.getRepository();
    return new MessageService(repository);
  }
}

export default MessageAPIFactory;
