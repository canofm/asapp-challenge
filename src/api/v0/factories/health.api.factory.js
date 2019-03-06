import { connect as db } from "../../../db";
import HealthRepository from "../repositories/health.repository";
import HealthService from "../services/health.service";
import HealthController from "../controllers/health.controller";

const defaultSetup = { db }; //TODO: db está mal en todos lados!

class HealthAPIFactory {
  static getController(overrides = {}) {
    const repository = this.getRepository(overrides);
    const service = this.getService(repository);
    return new HealthController(service);
  }

  static getRepository(overrides = {}) {
    const { db } = Object.assign({}, defaultSetup, overrides);
    return new HealthRepository(db);
  }

  static getService(repo = null) {
    const repository = repo ? repo : this.getRepository();
    return new HealthService(repository);
  }
}

export default HealthAPIFactory;
