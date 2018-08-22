// import { getRouteParts, RouteDescription } from "../wsdot-route-utils";
const { getRouteParts, RouteDescription } = require("../dist/commonjs/index");

describe("RouteDescription", () => {
  it("won't parse invalidly formatted routes", () => {
    expect(() => {
      const srid = "005AAA";
      const thing = new RouteDescription(srid); // eslint-disable-line no-unused-vars
    }).toThrowError();
  });
  it("can parse mainline routes", () => {
    const srid = "005";
    const desc = new RouteDescription(srid);
    expect(desc.sr).toEqual(srid);
    expect(desc.rrt).toBeNull();
    expect(desc.rrq).toBeNull();
    expect(desc.mainlineConnectionMP).toBeNull();
    expect(desc.rrqDescription).toBeNull();
    expect(desc.rrqDescription).toBeNull();
    expect(desc.toString()).toEqual(srid);
    expect(desc.shield).toEqual("IS");
  });
  it("can parse route with RRT && RRQ", () => {
    const srid = "101COABERDN";
    const routeParts = getRouteParts(srid, true);
    if (routeParts !== null) {
      const [sr, rrt, rrq] = routeParts;
      const desc = new RouteDescription(srid);
      expect(desc.sr).toEqual(sr);
      expect(desc.rrt).toEqual(rrt);
      expect(desc.rrq).toEqual(rrq);
      expect(desc.rrtDescription).toEqual("Couplet");
      expect(desc.rrqDescription).toEqual("Aberdeen");
      expect(desc.mainlineConnectionMP).toBeNull();
      expect(desc.shield).toEqual("US");
    }
  });
  it("can parse MP from ramp ID", () => {
    const srid = "005R109958";
    const desc = new RouteDescription(srid);
    expect(desc.mainlineConnectionMP).toEqual(99.58);
  });

  it("can optionally support direction", () => {
    const withDirId = "529SPEVERETd";
    const nonDirId = "005Q516479";

    const withDirDesc = new RouteDescription(withDirId, true);
    const nonDirDesc = new RouteDescription(nonDirId, false);
    const incDesc = new RouteDescription(nonDirId, true);
    expect(withDirDesc.isDecrease).toEqual(true);
    expect(nonDirDesc.isDecrease).toEqual(null);
    expect(incDesc.isDecrease).toEqual(false);
    expect(() => {
      const desc = new RouteDescription(withDirId, false); // eslint-disable-line no-unused-vars
    }).toThrowError();
  });
});
