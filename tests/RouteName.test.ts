import { WsdotRHRouteName } from "../src";
import routeList from "./sample-data/sample-route-names"

describe("WSDOT Roads & Highways Route Name parsing", () => {
    test("should be able to parse Roads & Highways WSDOT Route Name", async () => {
        expect(Array.isArray(routeList)).toEqual(true);
        /** expected format for the route names. */
        const expectedFormat = WsdotRHRouteName.routeNameRe;
        /** All of the names that aren't in the expected format. */
        const unmatchable = new Set<string>();
        for (const routeNameString of routeList) {
            const match = routeNameString.match(expectedFormat);
            if (!match) {
                unmatchable.add(routeNameString);
                continue;
            }
            let routeName: WsdotRHRouteName | null = null;
            expect(() => {
                routeName = new WsdotRHRouteName(routeNameString);
            }).not.toThrowError();
            if (routeName === null) {
                throw new TypeError("route name should not be null");
            }
        }
        if (!!unmatchable && unmatchable.size > 0) {
            console.warn(`Some of the input route names were skipped due to not matching the expected format.\n${[...unmatchable].join("\n")}\nExpected format: ${expectedFormat}`);
        }

    });
});