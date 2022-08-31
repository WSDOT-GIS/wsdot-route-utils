import type { Suffix } from "./regex.js";
import { getShieldType, ShieldType } from "./route-shields.js";
import rrqs from "./rrq.js";
import { RampDescription, RampRrtValue, rrts, RrtValue } from "./rrt.js";
import { DEFAULT_ROUTE_ID_PARSE_OPTIONS, getRouteParts, RouteIdConstructorOptions, RoutePartsArray, type RouteIdParseOptions } from "./wsdot-route-utils.js";

export interface IRouteDescription {
    /**
     * Mainline component of route ID.
     */
    sr: string | null;

    /**
     * Related Route Type (RRT) component.
     */
    rrt: RrtValue | null;

    /**
     * Related Route Qualifier (RRQ).
     */
    rrq: string | null;
    /**
     * Indicates if the route is a ramp.
     */
    isRamp: boolean | null;
    /**
     * Indicates decreasing direction was specified.
     * If the "canIncludeDirection" option was set to false
     * in the constructor, this value will be null.
     */
    isDecrease: boolean | null;

    /**
     * Gets the type of shield of a WA state route: "IS", "US", or "SR"
     */
    shield: ShieldType | null;

    /**
     * Indicates if this is a mainline route ID.
     * I.e., no RRT or RRQ.
     */
    isMainline: boolean,

    /**
     * A suffix used to indicate a route's direction
     * a/o route type.
     * 
     * | Context                                | Allowed suffixes        |
     * | -------------------------------------- | ----------------------- |
     * | LRS Feature Datasets / Feature Classes | no suffixes are allowed |
     * | WA Public Roads (WAPR)                 | `i`                     |
     * | Roads and Highways                     | `i`, `d`, `r`           |
     */
    RouteTypeSuffix: Suffix | null,

    /**
     * More detailed description of the RRT.
     * @returns Returns a detailed description of the RRT if possible.
     * Returns null if more details cannot be determined.
     */
    rrtDescription: RampRrtValue | string | null,

    /**
     * Detailed description of the RRQ.
     */
    rrqDescription: RampDescription | string | null,
    /**
     * If applicable, milepost where this route either leaves or joins the mainline.
     * Value will be null when not applicable.
     */
    mainlineConnectionMP: number | null,
    
    /**
     * Indicates if the route is a "local collector" type.
     */
    isLocalCollector: boolean
}
    

/**
 * Provides a description of a route.
 */
export class RouteDescription extends Object implements IRouteDescription {
    private _sr: string;
    private _rrt: RrtValue | null | undefined;
    private _rrq: string | null | undefined;
    private _isDecrease: boolean | null = null;
    private _suffix: Suffix | null = null;
    private _shield: ShieldType | null | undefined = undefined;



    /**
     * Creates new instance.
     * @param routeId - route ID
     * @param options - route parsing options. Note that the value of 
     * {@link RouteIdParseOptions.throwErrorOnMatchFail} will be ignored 
     * and will behave as if it were set to `true`.
     * @see - same named parameter of {@link getRouteParts}
     * @throws {@link TypeError} @see {@link getRouteParts}
     * @throws {@link FormatError} @see {@link getRouteParts}
     */
    constructor(routeId: string, options: RouteIdConstructorOptions = DEFAULT_ROUTE_ID_PARSE_OPTIONS) {
        super();
        // When constructing an object of this type, we ALWAYS want an exception
        // to be thrown when parsing.
        (options as RouteIdParseOptions).throwErrorOnMatchFail = true;
        const routeParts = getRouteParts(routeId, options) as RoutePartsArray;
        // If there are more than one allowedSuffixes defined...
        if (options?.allowedSuffixes && options?.allowedSuffixes.length) {
            let suffix: string | undefined;
            [this._sr, this._rrt, this._rrq, suffix] = routeParts;
            this._suffix = (suffix as Suffix) || null;
            this._isDecrease = suffix === "d";
        } else {
            [this._sr, this._rrt, this._rrq] = routeParts;
        }
    }

    public static parseWaprRouteId(routeId: string) {
        return new RouteDescription(routeId, {
            allowedSuffixes: ["d"],
            suffixesAreOptional: true
        })
    }

    public static parseRoadsAndHighwaysRouteId(routeId: string,) {
        return new RouteDescription(routeId, {
            allowedSuffixes: ["i", "d", "r"],
            suffixesAreOptional: false
        })
    }

    /**
     * Gets the type of shield of a WA state route: "IS", "US", or "SR"
     */
    public get shield(): ShieldType | null {
        if (this._shield === undefined) {
            this._shield = getShieldType(this.sr) || null;
        }
        return this._shield;
    }

    /**
     * Mainline component of route ID.
     */
    public get sr() {
        return this._sr;
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

    /**
     * A suffix used to indicate a route's direction
     * a/o route type.
     * 
     * | Context                                | Allowed suffixes        |
     * | -------------------------------------- | ----------------------- |
     * | LRS Feature Datasets / Feature Classes | no suffixes are allowed |
     * | WA Public Roads (WAPR)                 | `i`                     |
     * | Roads and Highways                     | `i`, `d`, `r`           |
     */
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
            return rrqs.get(this.rrq) || null;
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

export default RouteDescription