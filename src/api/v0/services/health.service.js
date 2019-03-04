class HealthService {
  constructor(healthRepository) {
    this.healthRepository = healthRepository;
  }

  check() {
    return this.healthRepository.check().then(() => ({ health: "ok" })); //TODO: modelizar objeto health
  }
}

export default HealthService;
