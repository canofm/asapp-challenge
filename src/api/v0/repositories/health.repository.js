import { ConnectionDBException } from "../../../exceptions";

class HealthRepository {
  constructor(db) {
    this.db = db();
  }

  check() {
    return this.db
      .select()
      .from("users")
      .timeout(1000)
      .catch(err => {
        console.log(err);
        throw new ConnectionDBException(err);
      });
  }
}

export default HealthRepository;
