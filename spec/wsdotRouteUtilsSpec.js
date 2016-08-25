/*eslint-env jasmine*/

"use strict";

var wsdotRouteUtils = require("../wsdot-route-utils");
var RouteDescription = wsdotRouteUtils.RouteDescription;
var getRouteParts = wsdotRouteUtils.getRouteParts;

describe("RouteDescription", () => {
    it("won't parse invalidly formatted routes", () => {
        var srid = "005AAA";
        expect(() => { var thing = new RouteDescription(srid); }).toThrowError();
    });
    it("can parse mainline routes", () => {
        var srid = "005";
        var desc = new RouteDescription(srid);
        expect(desc.sr).toEqual(srid);
        expect(desc.rrt).toBeNull();
        expect(desc.rrq).toBeNull();
        expect(desc.mainlineConnectionMP).toBeNull();
        expect(desc.rrqDescription).toBeNull();
        expect(desc.rrqDescription).toBeNull();
        expect(desc.toString()).toEqual(srid);
    });
    it("can parse route with RRT && RRQ", () => {
        var srid = "101COABERDN";
        var parts = getRouteParts(srid);
        var sr = parts[0], rrt = parts[1], rrq = parts[2];
        var desc = new RouteDescription(srid);
        expect(desc.sr).toEqual(sr);
        expect(desc.rrt).toEqual(rrt);
        expect(desc.rrq).toEqual(rrq);
        expect(desc.rrtDescription).toEqual("Couplet");
        expect(desc.rrqDescription).toEqual("Aberdeen");
        expect(desc.mainlineConnectionMP).toBeNull();
    });
    it("can parse MP from ramp ID", () => {
        var srid = "005R109958";
        var desc = new RouteDescription(srid);
        expect(desc.mainlineConnectionMP).toEqual(99.58);
    });

    it('can optionally support direction', function() {
        var withDirId = "529SPEVERETd";
        var nonDirId = "005Q516479";

        var withDirDesc = new RouteDescription(withDirId, true);
        var nonDirDesc = new RouteDescription(nonDirId, false);
        var incDesc = new RouteDescription(nonDirId, true);
        expect(withDirDesc.isDecrease).toEqual(true);
        expect(nonDirDesc.isDecrease).toEqual(null);
        expect(incDesc.isDecrease).toEqual(false);
        expect(() => {
            var desc = new RouteDescription(withDirId, false);
        }).toThrowError();
    });

});

