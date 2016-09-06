/**
 * Utilities for WSDOT Route Identifiers
 * @module wsdot-route-utils
 */
import { getShieldType } from "./route-shields";
/*
==RRTs (Related Roadway Type)==
AR Alternate Route
CD Collector Distributor (Dec)
CI Collector Distributor (Inc)
CO Couplet
FI Frontage Road (Inc)
FD Frontage Road (Dec)
LX Crossroad within Interchange
RL Reversible Lane
SP Spur
TB Transitional Turnback
TR Temporary Route
PR Proposed Route
===Ramps===
P1 - P9 Off Ramp (Inc)
PU Extension of P ramp
Q1 - Q9 On Ramp (Inc)
QU Extension of Q ramp
R1 - R9 Off Ramp (Dec)
RU Extension of R ramp
S1 - S9 On Ramp (Dec)
SU Extension of S ramp
==Ferries==
FS Ferry Ship (Boat)
FT Ferry Terminal
*/
/**
 * Appends text to the end of (a copy of) a regular expression.
 * @param {RegExp} inputRe - A regular expression ending with "$".
 * @param {string} escapedText - Text to append to the end of the input RegExp.
 * @returns {RegExp} - Returns a modified copy of the input RegExp.
 * @private
 */
function appendToRegex(inputRe, escapedText) {
    return new RegExp(inputRe.source.split("$")[0] + escapedText + "$");
}
/**
 * Matches state route format, with captures for SR, RRT, and RRQ. First element in array will be entire match.
 * @type {Regexp}
 * @const
 */
export const srRegex = /^(\d{3})(?:((?:AR)|(?:C[DI])|(?:C[O])|(?:F[DI])|(?:LX)|(?:[PQRS][\dU])|(?:RL)|(?:SP)|(?:TB)|(?:TR)|(?:PR)|(?:F[ST])|(?:ML))([A-Z0-9]{0,6}))?$/;
// Detects the decrease directional indicator used in WAPR.
const dirReSuffix = "(d)?";
/**
 * Matches state route + optional direction format, with captures for SR, RRT, RRQ, and direction. First element in array will be entire match.
 * @type {Regexp}
 * @const
 */
export const srdRegex = appendToRegex(srRegex, dirReSuffix);
/**
 * A more relaxed Regexp than srRegex, which doesn't check for specific RRTs, only that they are two characters long if present.
 * @type {Regexp}
 * @const
 */
export const relaxedRegex = /^(\d{3})(?:([A-Z1-9]{2})([A-Z0-9]{0,6}))?$/;
/**
 * Like {@link relaxedRegex}, but allows optional "d" suffix.
 * @type {Regexp}
 * @see {@link relaxedRegex}
 */
export const relaxedWithDirRegexp = appendToRegex(relaxedRegex, dirReSuffix);
// Define RRTs
let rrts = {
    AR: "Alternate Route",
    CO: "Couplet",
    FD: "Frontage Road Dec",
    FI: "Frontage Road Inc",
    FS: "Ferry Ship (Boat)",
    FT: "Ferry Terminal",
    PR: "Proposed Route",
    RL: "Reversible Lane",
    SP: "Spur",
    TB: "Transitional Turnback",
    TR: "Temporary Route",
    CD: "Collector Distributor Dec",
    CI: "Collector Distributor Inc",
    LX: "Crossroad within Interchange",
    HD: "Grade-Separated HOV-Dec",
    HI: "Grade-Separated HOV-Inc",
    ML: "Mainline (implied RRT–field is blank)",
    UC: "Under Construction",
};
// Add ramp RRTs.
let rampTypes = {
    P: ["Off", "Inc"],
    Q: ["On", "Inc"],
    R: ["Off", "Dec"],
    S: ["On", "Dec"]
};
["P", "Q", "R", "S"].forEach(letter => {
    for (let i = 0; i < 10; i++) {
        let [onOrOff, IncOrDec] = rampTypes[letter];
        rrts[letter] = `${onOrOff} Ramp, ${IncOrDec}`;
    }
});
let rrqs = {
    "ABERDN": "Aberdeen"
};
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
export function getRouteParts(routeId, throwErrorOnMatchFail = false, canIncludeDirection = false) {
    if (!(routeId && typeof routeId === "string")) {
        throw new TypeError("Input must be a string.");
    }
    let re = canIncludeDirection ? srdRegex : srRegex;
    let match = routeId.match(re);
    if (match) {
        return match.splice(1).map(s => {
            return s || null;
        });
    }
    else if (throwErrorOnMatchFail) {
        throw new Error(`${routeId} is not a valid WA state route identifier.`);
    }
    return null;
}
/**
 * Provides a description of a route.
 * @class module:wsdot-route-utils.RouteDescription
 */
export class RouteDescription {
    /**
     * Creates new instance.
     * @param {string} routeId - route ID
     * @param {boolean} canIncludeDirection - Indicates if "d" suffix is allowed in ID to show direction.
     */
    constructor(routeId, canIncludeDirection = false) {
        this._isDecrease = null;
        this._shield = undefined;
        if (canIncludeDirection) {
            let d;
            [this._sr, this._rrt, this._rrq, d] = getRouteParts(routeId, true, canIncludeDirection);
            this._isDecrease = d === "d" ? true : false;
        }
        else {
            [this._sr, this._rrt, this._rrq] = getRouteParts(routeId, true, canIncludeDirection);
        }
    }
    /**
     * Gets the type of shield of a WA state route: "IS", "US", or "SR"
     */
    get shield() {
        if (this._shield === undefined) {
            if (!this.sr) {
                this._shield = null;
            }
            else {
                this._shield = getShieldType(this.sr) || null;
            }
        }
        return this._shield;
    }
    /**
     * Mainline component of route ID.
     * @member {string}
     */
    get sr() {
        return this._sr;
    }
    /**
     * Related Route Type (RRT) component.
     * @member {string}
     */
    get rrt() {
        return this._rrt;
    }
    /**
     * Related Route Qualifier (RRQ).
     * @member {string}
     */
    get rrq() {
        return this._rrq;
    }
    /**
     * Indicates if this is a mainline route ID.
     * I.e., no RRT or RRQ.
     */
    get isMainline() {
        return !this.rrt && !this.rrq;
    }
    /**
     * Indicates decreasing direction was specified.
     * If the "canIncludeDirection" option was set to false
     * in the constructor, this value will be null.
     * @member {boolean}
     */
    get isDecrease() {
        return this._isDecrease;
    }
    /**
     * More detailed description of the RRT.
     * @member {string}
     */
    get rrtDescription() {
        return this.rrt ? rrts[this.rrt] : null;
    }
    /**
     * If applicable, milepost where this route either leaves or joins the mainline.
     * Value will be null when not applicable.
     * @member {number}
     */
    get mainlineConnectionMP() {
        if (this.rrq && /^\d+$/.test(this.rrq)) {
            return parseInt(this.rrq, 10) / 100;
        }
        else {
            return null;
        }
    }
    /**
     * Indicates if the route is a "local collector" type.
     * @returns {boolean}
     */
    get isLocalColector() {
        return this.rrt && /((LX)|(F[DI]))/.test(this.rrt);
    }
    /**
     * Indicates if the route is a ramp.
     * @returns {boolean}
     */
    get isRamp() {
        return this.rrt && /[PQRS][1-9]/.test(this.rrt);
    }
    /**
     * Detailed description of the RRQ.
     * @member {string}
     */
    get rrqDescription() {
        if (!this.rrq) {
            return null;
        }
        else if (rrqs.hasOwnProperty(this.rrq)) {
            return rrqs[this.rrq];
        }
        else if (typeof this.mainlineConnectionMP === "number") {
            return `at milepost ${this.mainlineConnectionMP}`;
        }
        else {
            return this.rrq;
        }
    }
    /**
     * Returns the route as a string.
     * @returns {string}
     */
    toString() {
        return `${this.sr}${this.rrt || ""}${this.rrq || ""}${this.isDecrease === true ? "d" : ""}`;
    }
}