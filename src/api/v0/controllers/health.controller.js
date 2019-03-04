export default class HealthController {
  constructor(healthService) {
    this.healthService = healthService;
  }

  check(req, res, next) {
    return this.healthService
      .check(req.body)
      .then(health => res.status(200).json(health))
      .catch(err => next(err));
  }
}
