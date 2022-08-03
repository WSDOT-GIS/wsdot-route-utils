import { readFile } from "node:fs/promises";
import { O_RDONLY } from "node:constants";
import { join } from "node:path";
import { WsdotRHRouteName } from "./RouteName.js";

describe("WSDOT Roads & Highways Route Name parsing", () => {
    test("should be able to parse Roads & Highways WSDOT Route Name", async () => {
        const textFile = join(module.path, "../sample-data/Sample Route names.txt");
        const routeList = (await readFile(textFile, {
            flag: O_RDONLY,
            encoding: "utf-8"
        })).split(/[\r\n]+/m);
        /** expected format for the route names. */
        const expectedFormat = /^(\d{3}[0-9A-Z]{0,8})([idr])(\d+)[AB]$/;
        for (const routeNameString of routeList) {
            const match = routeNameString.match(expectedFormat);
            if (!match) {
                console.warn(`Skipping test. ${routeNameString} did not match ${expectedFormat}`);
                continue;
            }
            let routeName;
            expect(() => {
                routeName = new WsdotRHRouteName(routeNameString);
            }).not.toThrowError();
        }

    });
});