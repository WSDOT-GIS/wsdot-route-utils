/**
 * This module is for use with the WSDOT LRS map service with Roads & Highways
 * extension for parsing its route name string values.
 * 
 * @todo The following route names found in the Roads & Highways service
 * do not currently match the regular expression and currently cannot be 
 * parsed.
 * 
 * 
 * * 002R1CN097Adi000000A
 * * 005CNLC2RMP1i000000A
 * * 005CNLC2RMP2i000000A
 * * 005CNLC2RMP3i000000A
 */

import { RouteDescription, Milepost, createRouteRegex } from "./index.js";

export type BackIndicator = "A" | "B";
export type IsBackInput = boolean | BackIndicator | Lowercase<BackIndicator>;

/**
 * Builds a {@link RegExp} that will match a route name.
 * @param validRrts - 
 * @see {@link createRouteRegex}
 * @returns 
 */
export function buildRouteNameRegExp(validRrts?: string[]): RegExp {
    // /^(?<routeIdAndDir>(?<routeId>[\da-z]+)(?<routeType>[idr]))(?<additionalInfo>\w+[idr])?(?<mpAndAB>(?<mpX1000>\d+)(?<ab>[AB]))$/i;
    const routeIdRegex = createRouteRegex(validRrts);

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
        return v instanceof RouteDescription ? v : RouteDescription.parseRoadsAndHighwaysRouteId(v, true);
    }
    static parseRouteIdAndMilepost(routeIdOrName: string): [RouteDescription, Milepost] {
        const match = routeIdOrName.match(WsdotRHRouteName.routeNameRe);
        if (match && match.groups) {
            const routeIdString = match.groups["routeIdAndDir"];
            const milepostString = match.groups["mpAndAB"];
            const routeId = WsdotRHRouteName.parseRouteDescription(routeIdString);
            const milepost = new Milepost(milepostString);
            return [routeId, milepost]
        }
        throw new TypeError(`routeName parameter "${routeIdOrName}" not in expected format: ${WsdotRHRouteName.routeNameRe}.`);
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
     * @param routeName A string that will be parsed into a {@link RouteDescription} and {@link Milepost}.
     */
    constructor(routeName: string)
    /**
     * Creates an instance from {@link RouteDescription} and {@link Milepost} parameters.
     * @param routeId - Route ID
     * @param mp - Milepost
     */
    constructor(routeId: RouteDescription | string, mp: Milepost)
    /**
     * 
     * @param routeIdOrName 
     * @param mp 
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
