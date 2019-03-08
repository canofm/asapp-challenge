import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../../server";
import config from "../../../../config";
import { ConnectionDBException } from "../../../../exceptions";
import HealthAPIFactory from "../../factories/health.api.factory";

chai.use(chaiHttp);
const request = appConfig => chai.request(app(appConfig));
const healthURI = `${config.api.baseUri}/check`;

describe("Health API", () => {
  describe("on POST /check", () => {
    it("if connection is fine, then it should returns 200 with health object", async () => {
      const { body, ...res } = await request()
        .post(healthURI)
        .send();

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(JSON.stringify(body)).to.be.eql(JSON.stringify(HealthAPIFactory.getHealthOk()));
    });

    it.skip("if it cannot connect to db, then it should returns 500", async () => {
      const { error, ...res } = await request({ db: { path: "./db/fileThatDoesntExists.sqlite3" } })
        .post(healthURI)
        .send();

      expect(res).to.have.status(500);
      expect(res).to.be.json;
      const errorExpected = new ConnectionDBException();
      expect(JSON.stringify(error)).to.be.eql(JSON.stringify(errorExpected));
    });
  });
});
