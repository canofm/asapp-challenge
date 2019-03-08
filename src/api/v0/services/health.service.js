import HealthAPIFactory from "../factories/health.api.factory";

class HealthService {
  constructor(healthRepository) {
    this.healthRepository = healthRepository;
  }

  check() {
    return this.healthRepository.check().then(() => HealthAPIFactory.getHealthOk());
  }
}

export default HealthService;
