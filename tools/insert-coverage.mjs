import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { JSDOM } from "jsdom";

/**
 * Gets the percentage covered from the SVG file.
 * @param {string|JSDOM} svgPath - Path to SVG file or an {@link JSDOM} containing the SVG.
 * @returns A string 
 */
async function getCoverageFromSvg(svgPath, outputAsNumber = false) {
    let svgJsDom;
    if (svgPath instanceof JSDOM) {
        svgJsDom = svgPath;
    } else {
        svgJsDom = await JSDOM.fromFile(svgPath, {
            contentType: "image/svg+xml"
        });
    }

    const percentDocumented = [
        ...svgJsDom.window.document.querySelectorAll("text")
    ].filter(t => t.textContent?.match(/^\d+%$/))
        .at(0).textContent || null;

    return outputAsNumber ? parseFloat(percentDocumented.replace("%", "")) : percentDocumented;
}

/**
 * Inserts badge into a node.
 * @param {Node} node - node that badge will be inserted into.
 */
 function addCoverageBadge(node, percentCovered) {
    const imgElement = document.createElement("img");
    imgElement.src = "coverage.svg";
    imgElement.alt = percentCovered ?
        `${percentCovered} of the code has been documented`
        : "coverage badge";

    const a = document.createElement("a");
    a.href = "https://github.com/Gerrit0/typedoc-plugin-coverage#readme";
    a.append(imgElement);
    node.append(a);
    return a;
}


const __file = fileURLToPath(import.meta.url);
const __dirname = dirname(__file);

const docsDir = join(__dirname, "..", "docs");

const indexPath = join(docsDir, "index.html");
const coveragePath = join(docsDir, "coverage.svg");

const jsDom = await JSDOM.fromFile(indexPath, { contentType: "text/html" });
const document = jsDom.window.document;

/**
 * The paragraph element that contains the anchor element that contains the badge images.
 * @type {HTMLParagraphElement?}
 */
const badges = document.body.querySelector("img[src^='https://img.shields.io']")?.parentElement?.parentElement || null;

if (badges === null) {
    throw new TypeError("Could not find badges' grandparent.");
}

/** @type {string?} */
let percentCovered = null;

try {
    percentCovered = await getCoverageFromSvg(coveragePath);
} catch (error) {
    console.error("Error extracting percent covered value from SVG", error);
}

addCoverageBadge(badges, percentCovered);

await writeFile(indexPath, jsDom.serialize(), {
    encoding: "utf8",
    flag: "w"
})
