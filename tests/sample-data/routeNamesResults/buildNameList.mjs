/**
 * This script was used to create a list of route names
 * from multiple Feature Sets. Multiple result feature 
 * sets were used get around map service's max record count.
 */
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from 'node:url';

// Get the path to this file that is executing.
const __filename = fileURLToPath(import.meta.url);
// Get the directory part of the filename.
const __dirname = dirname(__filename);

// Read the contents of the JSON files.
// Filenames were "query1.json" - "query3.json".
const fileContents = await Promise.all([1, 2, 3].map(
    n => join(__dirname, `query${n}.json`)).map(
        async (filename) => {
            return await readFile(filename, {
                encoding: "utf-8",
                flag: "r"
            });
        })
);

// Create a Set of the features' RouteName attributes.
const routeNames = new Set(fileContents.map(s => JSON.parse(s))
    .map(f => f.features)
    .flat()
    .map(f => f.attributes.RouteName)
);

// Write out a list of all the route names, separating them with newlines.
console.log([...routeNames.values()].join("\n"));