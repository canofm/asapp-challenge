class HealthRepository {
  constructor(db) {
    this.db = db;
  }

  check() {
    return new Promise((resolve, reject) => {
      return this.db.get("SELECT 1", (err, row) => {
        if (err || row[1] != 1) {
          reject(new Error(err)); //TODO: DBConnectionException
        }
        resolve();
      });
    });
  }
}

export default HealthRepository;
