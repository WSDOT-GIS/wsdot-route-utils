/**
 * This module is for use with the WSDOT LRS map service with Roads & Highways
 * extension for parsing its route name string values.
 * 
 * TODO: The following route names found in the Roads & Highways service
 * do not currently match the regular expression and currently cannot be 
 * parsed.
 * 
 * 
 * * 002R1CN097Adi000000A
 * * 005CNLC2RMP1i000000A
 * * 005CNLC2RMP2i000000A
 * * 005CNLC2RMP3i000000A
 * * 097AiCN002S2i000000A
 * * 405CNLC2RMP1i000000A
 * * 518CNLC2RMP1i000000A
 * * 520P1CN202di000000A
 * * 520P1CNLCdi000000A
 * * LC2512S5rampi000000A
 * * LCCN2026di000000A
 */

import { RouteDescription, Milepost, createRouteRegex, FormatError } from "./index.js";

export type BackIndicator = "A" | "B";
export type IsBackInput = boolean | BackIndicator | Lowercase<BackIndicator>;

/**
 * Builds a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp|RegExp} that will match a route name.
 * @param validRrts - 
 * @see {@link createRouteRegex}
 * @returns 
 */
export function buildRouteNameRegExp(validRrts?: string[]): RegExp {
    // /^(?<routeIdAndDir>(?<routeId>[\da-z]+)(?<routeType>[idr]))(?<additionalInfo>\w+[idr])?(?<mpAndAB>(?<mpX1000>\d+)(?<ab>[AB]))$/i;
    const routeIdRegex = createRouteRegex(validRrts, "PQRSUWXY");

    let routeIdPattern = routeIdRegex.source;

    // Remove the "^" and "$" parts of the pattern,
    // since it will be inserted into another regex.
    routeIdPattern = routeIdPattern.replace(/[$^]/g, "");

    const pattern = String.raw`^(?<routeIdAndDir>(?<routeId>${routeIdPattern})(?<routeType>[idr]))(?<additionalInfo>\w+[idr])?(?<mpAndAB>(?<mpX1000>\d+)(?<ab>[AB]))$`;

    return new RegExp(pattern);
}

/**
 * Route name used with WSDOT's implementation of ArcGIS Roads & Highways extension.
 */
export class WsdotRHRouteName {
    public static readonly routeNameRe = buildRouteNameRegExp();
    private static parseRouteDescription(v: RouteDescription | string) {
        return v instanceof RouteDescription ? v : RouteDescription.parseRoadsAndHighwaysRouteId(v);
    }
    static parseRouteIdAndMilepost(routeIdOrName: string): [RouteDescription, Milepost] {
        const match = routeIdOrName.match(WsdotRHRouteName.routeNameRe);
        if (match && match.groups) {
            const routeIdString = match.groups["routeIdAndDir"];
            const milepostString = match.groups["mpAndAB"] as `${number}${BackIndicator}`;
            const routeId = WsdotRHRouteName.parseRouteDescription(routeIdString);
            const milepost = Milepost.parseFromRoadsAndHighways(milepostString);
            return [routeId, milepost]
        }
        throw new FormatError(routeIdOrName, WsdotRHRouteName.routeNameRe, `routeName parameter "${routeIdOrName}" not in expected format: ${WsdotRHRouteName.routeNameRe}.`);
    }

    private _routeId: RouteDescription;
    private _milepost: Milepost;

    /** Route Identifier */
    public get routeId(): RouteDescription {
        return this._routeId;
    }

    /** 
     * Milepost w/ boolean back mileage indicator 
     */
    public get milepost(): Milepost {
        return this._milepost;
    }

    /**
     * Creates an instance by parsing the input string.
     * @param routeName - A string that will be parsed into a {@link RouteDescription} and {@link Milepost}.
     */
    constructor(routeName: string)
    /**
     * Creates an instance from {@link RouteDescription} and {@link Milepost} parameters.
     * @param routeId - Route ID
     * @param mp - Milepost
     */
    constructor(routeId: RouteDescription | string, mp: Milepost)

    /**
     * @param routeId - A route identifier string.
     */
    constructor(routeId: string)
    /**
     * @param routeDesc - A route description object.
     * @param mp - A milepost object.
     */
    constructor(routeDesc: RouteDescription, mp: Milepost)
    /**
     * Creates a new instance of this object.
     * @param routeIdOrName - A route ID or {@link RouteDescription} object.
     * @param mp - a milepost, required if {@link routeIdOrName} is a string.
     * @throws {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError|TypeError} - Thrown if input is a {@link RouteDescription} 
     * but no value was provided for  {@link mp}.
     */
    constructor(routeIdOrName: string | RouteDescription, mp?: Milepost) {
        if (routeIdOrName instanceof RouteDescription) {
            this._routeId = routeIdOrName;
            if (typeof mp === "undefined") {
                throw new TypeError(`You must provide a value for the mp parameter if first parameter is a ${RouteDescription.name}`);
            } else {
                this._milepost = mp;
            }
        } else {
            const [r, m] =
                WsdotRHRouteName.parseRouteIdAndMilepost(routeIdOrName);
            this._routeId = r;
            this._milepost = m;
        }

        if (!this._routeId || !this._milepost) {
            throw new TypeError();
        }
    }
}
