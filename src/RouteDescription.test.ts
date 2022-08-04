import RouteDescription, { type IRouteDescription } from "./RouteDescription.js";
import { rrtMapping, RrtValue } from "./rrt.js";
import { getRouteParts } from "./wsdot-route-utils.js";

/**
 * Tests the {@link input} object to make sure it has all the properties
 * and matching values of the {@link expected} object.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function allPropertiesMatchExpected(input: any, expected: any): void {
  for (const propertyName in expected) {
    if (Object.prototype.hasOwnProperty.call(expected, propertyName)) {
      const expectedValue = expected[propertyName];
      expect(input).toHaveProperty(propertyName, expectedValue);
    }
  }
}

/**
 * Tests a {@link Map} that maps string descriptions to {@link RrtValue} keys
 * to see if it contains values matching the input.
 */
function mappingHasKey(map: Map<RrtValue, string>, desc: RouteDescription): void {
  if (desc.rrt && map.has(desc.rrt)) {
    const expectedDesc = map.get(desc.rrt);
    expect(desc.rrtDescription).toEqual(expectedDesc);
  }
  expect(desc.rrt && map.has(desc.rrt));
}

describe("RouteDescription", () => {
  test("won't parse invalidly formatted routes", () => {
    expect(() => {
      const srid = "005AAA";
      const thing = new RouteDescription(srid); // eslint-disable-line @typescript-eslint/no-unused-vars
    }).toThrowError();
  });
  test("can parse mainline routes", () => {
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

    allPropertiesMatchExpected(desc, {
      sr: "005",
      rrt: null,
      rrq: null,
      mainlineConnectionMP: null,
      rrtDescription: null,
      rrqDescription: null,
      shield: "IS"
    });
  });
  test("can parse route with RRT && RRQ", () => {
    const srid = "101COABERDN";
    const routeParts = getRouteParts(srid, {
      throwErrorOnMatchFail: true
    });
    if (routeParts !== null) {
      const [sr, rrt, rrq] = routeParts;
      expect(sr).toEqual("101");
      expect(rrt).toEqual("CO");
      expect(rrq).toEqual("ABERDN");
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
  test("can parse MP from ramp ID", () => {
    const srid = "005R109958";
    const desc = new RouteDescription(srid);
    expect(desc.mainlineConnectionMP).toEqual(99.58);
  });

  test("can optionally support direction", () => {
    const withDirId = "529SPEVERETd";
    const nonDirId = "005Q516479";

    const withDirDesc = new RouteDescription(withDirId, {
      suffixesAreOptional: false,
      allowedSuffixes: ["d"]
    });
    const nonDirDesc = new RouteDescription(nonDirId);
    expect(withDirDesc.isDecrease).toEqual(true);
    expect(nonDirDesc.isDecrease).toEqual(null);

    const incDesc = new RouteDescription(nonDirId, {
      suffixesAreOptional: true,
      allowedSuffixes: ["d"]
    });
    expect(incDesc.isDecrease).toEqual(false);
    expect(() => {
      const desc = new RouteDescription(withDirId); // eslint-disable-line no-unused-vars
      const expected: IRouteDescription = {
        sr: "005",
        rrt: "Q5",
        rrq: "16479",
        isRamp: true,
        isMainline: false,
        mainlineConnectionMP: 16.479,
        isDecrease: true,
        isLocalCollector: false,
        RouteTypeSuffix: "d",
        rrtDescription: "On Ramp 5, Dec",
        rrqDescription: null,
        shield: "IS"
      };
      allPropertiesMatchExpected(desc, expected);
      mappingHasKey(rrtMapping, desc);
    }).toThrowError();
  });
});


