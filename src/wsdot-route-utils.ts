/**
 * Utilities for WSDOT Route Identifiers
 */

import FormatError from "./FormatError.js";
import { appendSuffixesToRegex, srRegex, type Suffix } from "./regex.js";
import type { RrtValue } from "./rrt.js";

/**
 * An array resulting in a Route ID being
 * split into its component parts.
 */
export type RoutePartsArray =
  [string, RrtValue, string]
  | [string, null, null]
  | [string, RrtValue, string, string]
  | [string, null, null, string]

/**
 * Options for parsing route IDs.
 */
export interface RouteIdParseOptions {
  /**
   * True if an error be thrown if the input doesn't match
   * the expected format, false otherwise.
   */
  throwErrorOnMatchFail?: boolean;
  /** Will the suffixes be optional? */
  suffixesAreOptional?: boolean;
  /** Which suffixes will be allowed, if any? */
  allowedSuffixes?: Suffix[];
}

export const DEFAULT_ROUTE_ID_PARSE_OPTIONS: RouteIdParseOptions = {
  throwErrorOnMatchFail: true
}

/**
 * Splits a state route identifier into its component SR, RRT, and RRQ parts.
 * If the input route ID is not in the expected format, one of two things
 * will happen according to the value of the "throwErrorOnMatchFail" parameter.
 * If set to false, null will be returned. If set to true, an Error will be thrown.
 * @param routeId - A state route identifier.
 * @param throwErrorOnMatchFail - Determines if route IDs that are
 * not in the expected format will fail or simply return null.
 * @param allowedSuffixes - Additional suffix characters that are allowed after the SR+RRT+RRQ
 * @returns An array of three elements: SR, RRT, and RRQ.
 * The elements at position 1 and 2 may be null if a route has no RRT or RRQ
 * (as would be the case with a mainline).
 * Will be null if the routeId is not in the expected format and if throwErrorOnMatchFail is false.
 * @throws {@link TypeError} thrown if routeId is not a string.
 * @throws {@link FormatError} thrown if routeId is not in the expected format and throwErrorOnMatchFail is true.
 */
export function getRouteParts(
  routeId: string,
  options: RouteIdParseOptions = {
    throwErrorOnMatchFail: true
  }
) {
  if (!(routeId && typeof routeId === "string")) {
    throw new TypeError("Input must be a string.");
  }
  // specify a regex based on the suffixesAreOptional and allowedSuffixes.
  let re: RegExp;
  if (options?.allowedSuffixes && options?.allowedSuffixes.length) {
    re = appendSuffixesToRegex(srRegex, options);
  } else {
    re = srRegex;
  }

  const match = routeId.match(re);
  if (match) {
    return match.splice(1).map(s => s || null) as RoutePartsArray;
  } else if (options?.throwErrorOnMatchFail) {
    throw new FormatError(routeId, re);
  } else {
    return null;
  }
}


