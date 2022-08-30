import { getPrefix, getShieldType, shields } from "../src";
import routeResults from "./sample-data/routes.json"

const shieldsArray = [...shields];

/** The results of the "routes" query from the ELC." */
type RouteResults = Record<string, Record<string, number>>;



function getUniqueRoutes(routes: RouteResults) {
    const output = new Array<string>();
    const currentRoutes = routes;
    for (const routeId in currentRoutes) {
        if (Object.prototype.hasOwnProperty.call(currentRoutes, routeId)) {
            // const routeType = routeToType[routeId];
            output.push(routeId);
        }
    }
    return output;
}




describe("test route shield types", () => {
    const uniqueRoutes = getUniqueRoutes(routeResults)
        .filter(r => r.length === 3)
    const shieldTypes = [...shields.values()];


    for (const routeId of uniqueRoutes) {
        let shieldType = getShieldType(routeId);
        expect(shieldType && shieldType in shieldTypes);
        shieldType = getShieldType(parseInt(routeId, 10));
        expect(shieldType && shieldType in shieldTypes);
    }
});

describe.each(shieldsArray)(
    'getPrefix(%s)',
    (input, symbol) => {
        const prefix = getPrefix(input);
        const expected = symbol.description === "IS" ? "I" : symbol.description;
        test(`returns ${expected}`, () => {
            expect(prefix).toBe(expected);
        });
    }
);
