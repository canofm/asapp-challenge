// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/challenge.sqlite3",
      useNullAsDefault: true
    }
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory"
    },
    seeds: {
      directory: "./src/db/tests/seeds"
    }
  }
};
