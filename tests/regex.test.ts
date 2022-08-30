import { srRegex, createRrtRegex, rrtMapping } from "../src";

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
    });

    test("create RRT RegExp", () => {
        const rrtRegex = createRrtRegex();
        console.debug("RRT Regex", rrtRegex);
        for (const [rrt] of rrtMapping) {
            expect(rrt).toMatch(rrtRegex);
        }
    })
});