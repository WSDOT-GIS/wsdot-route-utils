/*eslint-env jasmine*/

let wsdotRouteUtils = require("../index");
let RouteDescription = wsdotRouteUtils.default;
let getRouteParts = wsdotRouteUtils.getRouteParts;

describe("RouteDescription", () => {
    it("won't parse invalidly formatted routes", () => {
        let srid = "005AAA";
        expect(() => { let thing = new RouteDescription(srid); }).toThrowError();
    });
    it("can parse mainline routes", () => {
        const srid = "005";
        let desc = new RouteDescription(srid);
        expect(desc.sr).toEqual(srid);
        expect(desc.rrt).toBeNull();
        expect(desc.rrq).toBeNull();
        expect(desc.mainlineConnectionMP).toBeNull();
        expect(desc.rrqDescription).toBeNull();
        expect(desc.rrqDescription).toBeNull();
        expect(desc.toString()).toEqual(srid);
    });
    it("can parse route with RRT && RRQ", () => {
        const srid = "101COABERDN";
        let [sr, rrt, rrq] = getRouteParts(srid);
        let desc = new RouteDescription(srid);
        expect(desc.sr).toEqual(sr);
        expect(desc.rrt).toEqual(rrt);
        expect(desc.rrq).toEqual(rrq);
        expect(desc.rrtDescription).toEqual("Couplet");
        expect(desc.rrqDescription).toEqual("Aberdeen");
        expect(desc.mainlineConnectionMP).toBeNull();
    });
    it("can parse MP from ramp ID", () => {
        const srid = "005R109958";
        let desc = new RouteDescription(srid);
        expect(desc.mainlineConnectionMP).toEqual(99.58);
    });
});

