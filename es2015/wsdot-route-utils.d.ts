/**
 * Utilities for WSDOT Route Identifiers
 * @module wsdot-route-utils
 */
import { ShieldType } from "./route-shields";
/**
 * Matches state route format, with captures for SR, RRT, and RRQ. First element in array will be entire match.
 * @type {Regexp}
 * @const
 */
export declare const srRegex: RegExp;
/**
 * Matches state route + optional direction format, with captures for SR, RRT, RRQ, and direction. First element in array will be entire match.
 * @type {Regexp}
 * @const
 */
export declare const srdRegex: RegExp;
/**
 * A more relaxed Regexp than srRegex, which doesn't check for specific RRTs, only that they are two characters long if present.
 * @type {Regexp}
 * @const
 */
export declare const relaxedRegex: RegExp;
/**
 * Like {@link relaxedRegex}, but allows optional "d" suffix.
 * @type {Regexp}
 * @see {@link relaxedRegex}
 */
export declare const relaxedWithDirRegexp: RegExp;
/**
 * Splits a state route identifer into its component SR, RRT, and RRQ parts.
 * If the input route ID is not in the expected format, one of two things
 * will happen according to the value of the "throwErrorOnMatchFail" parameter.
 * If set to false, null will be returned. If set to true, an Error will be thrown.
 * @param {string} routeId - A state route identifier.
 * @param {boolean} [throwErrorOnMatchFail=false] - Determines if route IDs that are
 * not in the expected format will fail or simply return null.
 * @returns {string[]} An array of three elements: SR, RRT, and RRQ.
 * The elements at position 1 and 2 may be null if a route has no RRT or RRQ
 * (as would be the case with a mainline).
 * Will be null if the routeId is not in the expected format and if throwErrorOnMatchFail is false.
 */
export declare function getRouteParts(routeId: string, throwErrorOnMatchFail?: boolean, canIncludeDirection?: boolean): string[];
/**
 * Provides a description of a route.
 * @class module:wsdot-route-utils.RouteDescription
 */
export declare class RouteDescription {
    private _sr;
    private _rrt;
    private _rrq;
    private _isDecrease;
    private _shield;
    /**
     * Creates new instance.
     * @param {string} routeId - route ID
     * @param {boolean} canIncludeDirection - Indicates if "d" suffix is allowed in ID to show direction.
     */
    constructor(routeId: string, canIncludeDirection?: boolean);
    /**
     * Gets the type of shield of a WA state route: "IS", "US", or "SR"
     */
    readonly shield: ShieldType;
    /**
     * Mainline component of route ID.
     * @member {string}
     */
    readonly sr: string;
    /**
     * Related Route Type (RRT) component.
     * @member {string}
     */
    readonly rrt: string;
    /**
     * Related Route Qualifier (RRQ).
     * @member {string}
     */
    readonly rrq: string;
    /**
     * Indicates if this is a mainline route ID.
     * I.e., no RRT or RRQ.
     */
    readonly isMainline: boolean;
    /**
     * Indicates decreasing direction was specified.
     * If the "canIncludeDirection" option was set to false
     * in the constructor, this value will be null.
     * @member {boolean}
     */
    readonly isDecrease: boolean;
    /**
     * More detailed description of the RRT.
     * @member {string}
     */
    readonly rrtDescription: string;
    /**
     * If applicable, milepost where this route either leaves or joins the mainline.
     * Value will be null when not applicable.
     * @member {number}
     */
    readonly mainlineConnectionMP: number;
    /**
     * Indicates if the route is a "local collector" type.
     * @returns {boolean}
     */
    readonly isLocalColector: boolean;
    /**
     * Indicates if the route is a ramp.
     * @returns {boolean}
     */
    readonly isRamp: boolean;
    /**
     * Detailed description of the RRQ.
     * @member {string}
     */
    readonly rrqDescription: string;
    /**
     * Returns the route as a string.
     * @returns {string}
     */
    toString(): string;
}
