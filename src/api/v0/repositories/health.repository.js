import { ConnectionDBException } from "../../../exceptions";

class HealthRepository {
  constructor(db) {
    this.db = db();
  }

  check() {
    return this.db
      .select()
      .from("users")
      .limit(1)
      .timeout(1000)
      .catch(err => {
        throw new ConnectionDBException(err);
      });
  }
}

export default HealthRepository;
