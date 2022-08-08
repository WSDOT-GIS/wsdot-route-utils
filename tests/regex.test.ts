import { srRegex } from "../src/index.js";

describe("RegExp tests", () => {
    test("route groups are correct", () => {
        const srid = "101COABERDN";
        const match = srid.match(srRegex);
        expect(match).not.toBeNull();
        if (match) {
            const [whole, sr, rrt, rrq] = match;
            expect(whole).toEqual(srid);
            expect(sr).toEqual("101");
            expect(rrt).toEqual("CO");
            expect(rrq).toEqual("ABERDN");
        }
    })
});