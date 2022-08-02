import { readFile } from "node:fs/promises";
import { O_RDONLY } from "node:constants";
import {join} from "node:path";
import { WsdotRHRouteName } from "./RouteName.js";

describe("WSDOT Roads & Highways Route Name parsing", () => {
    it("should be able to parse Roads & Highways WSDOT Route Name", async () => {
        const textFile = join(module.path, "../sample-data/Sample Route names.txt");
        const routeList = (await readFile(textFile, {
            flag: O_RDONLY,
            encoding: "utf-8"
        })).split(/[\r\n]+/m);
        for (const routeNameString of routeList) {
            let routeName = new WsdotRHRouteName(routeNameString);

        }

    });
});