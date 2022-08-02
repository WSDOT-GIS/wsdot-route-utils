import { RouteDescription } from "./index.js";

export type BackIndicator = "A" | "B";
export type IsBackInput = boolean | BackIndicator | Lowercase<BackIndicator>;

/**
 * Represents a WA state route milepost,
 * consisting of a numeric and "is back"
 * boolean value.
 * @member {number} mp
 * @member {boolean} IsBack
 */
export class Milepost extends Object {
    protected _isBack: boolean = false;
    private _mp: number = NaN;

    private static readonly _mpRe = /^(?<mpX1000>\d+)(?<ab>[AB])$/i;

    public get isBack(): boolean {
        return this._isBack;
    }
    public set isBack(v: boolean | BackIndicator | Lowercase<BackIndicator>) {
        if (typeof v === "boolean") {
            this._isBack = v;
        } else if (v.toUpperCase() === "B") {
            this._isBack = true;
        } else if (v.toUpperCase() === 'A') {
            this._isBack = false;
        } else {
            const validValues = [true, false, "A", "B", "a", "b"];
            throw new TypeError(`Input string is not valid: ${v}. Valid values are ${validValues.join(", ")}.`);
        }
        this._isBack = typeof v === "boolean" ? v : v.toUpperCase() === "B";
    }


    public get mp(): number {
        return this._mp;
    }
    public set mp(v: number | string) {
        if (typeof v === "string") {
            this._mp = parseInt(v, 10) / 1_000;
        } else {
            this._mp = v;
        }
    }

    public get mpAsChar(): BackIndicator {
        return this.isBack ? "B" : "A";
    }

    override toString() {
        return `${this.mp}${this.mpAsChar}`;
    }


    constructor(mpString: string)
    constructor(mp: number, isBack: IsBackInput)
    constructor(mpStringOrNumber: string | number, isBack: IsBackInput = false) {
        super();
        if (typeof mpStringOrNumber === "string") {
            const match = mpStringOrNumber.match(Milepost._mpRe);
            if (!(match && match.length >= 3 && match.groups)) {
                throw new TypeError(`Input string "${mpStringOrNumber}" was not in expected format: ${Milepost._mpRe}.`);
            }
            this.mp = match.groups["mpX1000"];
            this.isBack = match.groups["ab"] as BackIndicator | Lowercase<BackIndicator>;
            // // Remove the first element, which is the complete match.
            // match.slice(1)
            //     .map((s, i) => {
            //         if (i === 0) {
            //             this.mp = s;
            //         } else {
            //             this.isBack = s as BackIndicator;
            //         }
            //     })
        } else {
            this.mp = mpStringOrNumber;
            this.isBack = isBack;
        }
    }
}

/**
 * Route name used with WSDOT's implementation of ArcGIS Roads & Highways extension.
 * @property {RouteDescription} routeId - Route Identifier
 * @property {Milepost} mp
 */
export class WsdotRHRouteName {
    private static readonly routeNameRe = /^(?<routeIdAndDir>(?<routeId>[\da-z]+)(?<routeType>[idr]))(?<mpAndAB>(?<mpX1000>\d+)(?<ab>[AB]))$/i;

    private _routeId: RouteDescription | undefined = undefined;
    public get routeId(): RouteDescription {
        return this._routeId!;
    }
    public set routeId(v: RouteDescription | string) {
        this._routeId = v instanceof RouteDescription ? v : new RouteDescription(v, true);
    }


    private _milepost: Milepost | undefined = undefined;
    public get milepost(): Milepost {
        return this._milepost!;
    }
    public set milepost(v: Milepost | string) {
        this._milepost = v instanceof Milepost ? v : new Milepost(v);
    }

    constructor(routeName: string)
    constructor(routeId: RouteDescription | string, mp: Milepost)
    /** @private */
    constructor(routeIdOrName: string | RouteDescription, mp?: Milepost) {
        if ((routeIdOrName instanceof RouteDescription || typeof routeIdOrName === "string") && mp instanceof Milepost) {
            this.routeId = routeIdOrName;
            this.milepost = mp;
        }
        else if (typeof routeIdOrName === "string") {
            const match = routeIdOrName.match(WsdotRHRouteName.routeNameRe);
            if (match && match.groups) {
                this.routeId = match.groups["routeIdAndDir"];
                this.milepost = match.groups["mpAndAB"];
            } else {
                throw new TypeError(`routeName parameter "${routeIdOrName}" not in expected format: ${WsdotRHRouteName.routeNameRe}.`);
            }
        } else {
            throw new TypeError("input arguments not of expected types.");
        }

        if (this._routeId === undefined || this._milepost === undefined) {
            throw new TypeError("Parameters have not been assigned.")
        }
    }
}
