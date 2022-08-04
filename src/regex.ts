import { rrtMapping } from "./rrt.js";
import type { RouteIdParseOptions } from "./wsdot-route-utils.js";

export type Suffix = "d" | "i" | "r";

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
 * Amends the input {@link RegExp} to allow suffix characters.
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
 * Creates a regular expression that will match a state route.
 * @param validRrts - You only need to use this parameter if new
 * RRTs have been added since this module was last published 
 * and you need to override the defaults.
 * @returns Will look something like this:
 * 
 * ```typescript
 * /^(?<sr>\d{3})(?:(?<rrt>(?:AR)|(?:C[DI])|(?:C[O])|(?:F[DI])|(?:LX)|(?:[PQRS][\dU])|(?:RL)|(?:SP)|(?:TB)|(?:TR)|(?:PR)|(?:F[ST])|(?:ML))(?<rrq>[A-Z0-9]{0,6}))?$/;
 * ```
 */
export function createRouteRegex(validRrts?: string[]): RegExp {
    if (!validRrts) {
        validRrts = [...rrtMapping.keys()];
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