/**
 * Utilities for WSDOT Route Identifiers
 * @module wsdot-route-utils
 */

import FormatError from "./FormatError.js";
import { appendSuffixesToRegex, srRegex, type Suffix } from "./regex.js";
import { getShieldType, type ShieldType } from "./route-shields.js";
import rrqs from "./rrq.js";
import { rrts, rrtMapping, type RrtValue } from "./rrt.js";

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
 * @throws {TypeError} thrown if routeId is not a string.
 * @throws {FormatError} thrown if routeId is not in the expected format and throwErrorOnMatchFail is true.
 */
export function getRouteParts(
  routeId: string,
  throwErrorOnMatchFail: true,
  suffixesAreOptional?: boolean,
  ...allowedSuffixes: Suffix[]
): RoutePartsArray
export function getRouteParts(
  routeId: string,
  throwErrorOnMatchFail = false,
  suffixesAreOptional = false,
  ...allowedSuffixes: Suffix[]
) {
  if (!(routeId && typeof routeId === "string")) {
    throw new TypeError("Input must be a string.");
  }
  // specify a regex based on the suffixesAreOptional and allowedSuffixes.
  let re: RegExp;
  if (allowedSuffixes && allowedSuffixes.length) {
    re = appendSuffixesToRegex(srRegex, suffixesAreOptional, ...allowedSuffixes);
  } else {
    re = srRegex;
  }

  const match = routeId.match(re);
  if (match) {
    return match.splice(1).map(s => s || null) as RoutePartsArray;
  } else if (throwErrorOnMatchFail) {
    throw new FormatError(routeId, re);
  } else {
    return null;
  }
}

/**
 * Provides a description of a route.
 */
export class RouteDescription extends Object {
  private _sr: string | null | undefined;
  private _rrt: RrtValue | null | undefined;
  private _rrq: string | null | undefined;
  private _isDecrease: boolean | null = null;
  private _suffix: Suffix | null = null;

  private _shield: ShieldType | null | undefined = undefined;

  /**
   * Creates new instance.
   * @param routeId - route ID
   * @param allowedSuffixes - A list of strings representing suffixes that are allowed.
   * @see - same named parameter of {@link getRouteParts}
   * @throws {FormatError} {@see {@link getRouteParts}}
   */
  constructor(routeId: string, suffixesAreOptional = false, ...allowedSuffixes: Suffix[]) {
    super();
    const routeParts = getRouteParts(routeId, true, suffixesAreOptional, ...allowedSuffixes);
    if (allowedSuffixes && allowedSuffixes.length) {
      let suffix: string | undefined;
      [this._sr, this._rrt, this._rrq, suffix] = routeParts;
      this._suffix = (suffix as Suffix) || null;
      this._isDecrease = suffix === "d";
    } else {
      [this._sr, this._rrt, this._rrq] = routeParts;
    }
  }

  /**
   * Gets the type of shield of a WA state route: "IS", "US", or "SR"
   */
  public get shield(): ShieldType | null {
    if (this._shield === undefined) {
      if (!this.sr) {
        this._shield = null;
      } else {
        this._shield = getShieldType(this.sr) || null;
      }
    }
    return this._shield;
  }

  /**
   * Mainline component of route ID.
   */
  public get sr(): string | null {
    return this._sr || null;
  }

  /**
   * Related Route Type (RRT) component.
   */
  public get rrt(): RrtValue | null {
    return this._rrt || null;
  }

  /**
   * Related Route Qualifier (RRQ).
   */
  public get rrq(): string | null {
    return this._rrq || null;
  }

  /**
   * Indicates if this is a mainline route ID.
   * I.e., no RRT or RRQ.
   */
  public get isMainline() {
    return !this.rrt && !this.rrq;
  }

  /**
   * Indicates decreasing direction was specified.
   * If the "canIncludeDirection" option was set to false
   * in the constructor, this value will be null.
   */
  public get isDecrease() {
    return this._isDecrease;
  }

  public get RouteTypeSuffix() {
    return this._suffix;
  }

  /**
   * More detailed description of the RRT.
   * @returns Returns a detailed description of the RRT if possible.
   * Returns null if more details cannot be determined.
   */
  public get rrtDescription(): string | null {
    return this.rrt ? rrts[this.rrt] : null;
  }

  /**
   * If applicable, milepost where this route either leaves or joins the mainline.
   * Value will be null when not applicable.
   */
  public get mainlineConnectionMP(): number | null {
    if (this.rrq && /^\d+$/.test(this.rrq)) {
      return parseInt(this.rrq, 10) / 100;
    } else {
      return null;
    }
  }

  /**
   * Indicates if the route is a "local collector" type.
   */
  public get isLocalCollector(): boolean {
    return !!this.rrt && /((LX)|(F[DI]))/.test(this.rrt);
  }

  /**
   * Indicates if the route is a ramp.
   */
  public get isRamp(): boolean {
    return this.RouteTypeSuffix === "r" || (!!this.rrt && /[PQRS][1-9]/.test(this.rrt)); // spell-checker: disable-line
  }

  /**
   * Detailed description of the RRQ.
   */
  public get rrqDescription(): string | null {
    if (!this.rrq) {
      return null;
    }
    else if (rrqs.has(this.rrq)) {
      return rrqs.get(this.rrq)!;
    }
    else if (typeof this.mainlineConnectionMP === "number") {
      return `at milepost ${this.mainlineConnectionMP}`;
    }
    return this.rrq;
  }

  /**
   * Returns the route ID string.
   */
  public override toString() {
    return `${this.sr}${this.rrt || ""}${this.rrq || ""}${this.RouteTypeSuffix || ""}`;
  }
}
