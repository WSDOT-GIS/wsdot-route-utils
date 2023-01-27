import FormatError from "./FormatError.js";
import { rrtMapping } from "./rrt.js";
import type { RouteIdParseOptions } from "./wsdot-route-utils.js";

export type Suffix = "d" | "i" | "r";

/**
 * Determines if an input string is a valid suffix.
 * @param input - A string to be checked.
 * @returns 
 */
export function isSuffix(input: unknown): input is Suffix {
    return typeof input === "string" && /^[dir]$/.test(input);
}

/**
 * Appends text to the end of (a copy of) a regular expression.
 * @param inputRe - A regular expression ending with "$".
 * @param escapedText - Text to append to the end of the input RegExp.
 * @returns - Returns a modified copy of the input RegExp.
 */
function appendToRegex(inputRe: RegExp, escapedText: string): RegExp {
    return new RegExp(inputRe.source.split("$")[0] + escapedText + "$");
}

/**
 * Amends the input [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) to allow suffix characters.
 * @param inputRe - a regular expression.
 * @param options - parsing options.
 * @returns 
 */
export function appendSuffixesToRegex(inputRe: RegExp, options: RouteIdParseOptions) {
    if (!options.allowedSuffixes || options.allowedSuffixes.length < 1) {
        throw new TypeError("No suffixes were provided.");
    }
    for (const suffix of options.allowedSuffixes) {
        if (suffix.length !== 1) {
            throw new RangeError(`All suffixes strings must only be one character. This value does not meet these requirements: ${suffix}`);
        }
    }
    let escapedText = `(?<suffix>[${options.allowedSuffixes.join("")}])`;
    if (options.suffixesAreOptional) {
        escapedText += "?";
    }
    return appendToRegex(inputRe, escapedText)
}

/**
 * Creates a [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) that will match any of the provided RRT values.
 * @param validRrts - A list of RRT values
 * @returns A regular expression that will match all of the {@link validRrts}.
 */
export function createRrtRegex(validRrts: string[] = [...rrtMapping.keys()]) {
    function createRangePart(chars: Set<string>) {
        const charArray = [...chars].sort();
        return charArray.join("");
    }
    const mapping = new Map<string, Set<string>>();
    for (const rrt of validRrts) {
        if (rrt.length !== 2) {
            throw new FormatError(rrt, /^.{2}$/);
        }
        const letter = rrt[0];
        if (mapping.has(letter)) {
            mapping.get(letter)?.add(rrt[1]);
        } else {
            mapping.set(letter, new Set([rrt[1]]));
        }
    }
    const parts = new Array<string>();
    for (const [letter, chars] of mapping) {
        const part = `(${letter}[${createRangePart(chars)}])`
        parts.push(part);
    }

    const pattern = parts.join("|")
        // Replace list of digits with digit range
        .replaceAll(/123456789/g, "1-9")
        .replaceAll(/\[([^[\]])\]/g, "$1");
    return new RegExp(pattern);
}

/**
 * Creates a regular expression that will match a state route.
 * @param validRrts - You only need to use this parameter if new
 * RRTs have been added since this module was last published 
 * and you need to override the defaults.
 * @param rampLetters - Specify which letters ramp RRTs start with, overriding the defaults.
 * @returns Will look something like this:
 * 
 * ```typescript
 * /^(?<sr>\d{3})(?:(?<rrt>(?:AR)|(?:C[DI])|(?:C[O])|(?:F[DI])|(?:LX)|(?:[PQRS][\dU])|(?:RL)|(?:SP)|(?:TB)|(?:TR)|(?:PR)|(?:F[ST])|(?:ML))(?<rrq>[A-Z0-9]{0,6}))?$/;
 * ```
 */
export function createRouteRegex(validRrts: string[] = [...rrtMapping.keys()], rampLetters: string | string[] = ["P", "Q", "R", "S"]): RegExp {
    // Simplify the part of the regex that matches ramp RRTs.
    // Instead of `(P1)|(P2)|(P3)`...`(S1)|(S2)`, etc., use
    // ([PQRS\dU])
    let rampLettersRe: RegExp | null = null;
    if (rampLetters) {
        // If ramp letters is a single string, split into individual letters.
        if (typeof rampLetters === "string") {
            rampLetters = [...rampLetters]
        }
        // Test to make sure each string is only one character long.
        for (const rl of rampLetters) {
            if (rl.length != 1) {
                throw new TypeError(`Invalid value for member of ramp letters array: "${rl}"`);
            }
        }
        // Create a regex matching ramp RRTs using the specified rampLetters.
        // Matches that letter plus either a digit or a "U".
        rampLettersRe = new RegExp(String.raw`[${rampLetters.join("")}][\dU]`);
        // Remove the individual ramp RRTs from the array of valid RRTs. 
        validRrts = validRrts.filter(r => !rampLettersRe?.test(r));
        // Add the simplified version.
        validRrts.push(rampLettersRe.source);
    }
    const rrtGroups = validRrts.map(rrt => `(?:${rrt})`).join("|");
    const srGroup = "(?<sr>\\d{3})";
    const rrqGroup = "(?<rrq>[A-Z0-9]{0,6})";
    const pattern = `^${srGroup}(?:(?<rrt>${rrtGroups})${rrqGroup})?$`
    return new RegExp(pattern);
}

/**
 * Matches state route format, with captures for SR, RRT, and RRQ. First element in array will be entire match.
 * 
 
 */
export const srRegex = createRouteRegex();