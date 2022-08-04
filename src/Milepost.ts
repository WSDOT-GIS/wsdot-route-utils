import type { BackIndicator, IsBackInput } from "./RouteName.js";

/**
 * Represents a WA state route milepost,
 * consisting of a numeric and "is back"
 * boolean value.
 */
export class Milepost extends Object {
    protected _isBack = false;
    private _mp = NaN;

    private static readonly _mpRe = /^(?<mpX1000>\d+)(?<ab>[AB])$/i;

    /**
     * Parses a string into a boolean value: true for back mileage,
     * or false otherwise.
     * @param backIndicator - Input string. If this parameter is boolean,
     * this function will simply return the same value.
     * @returns A boolean equivalent of input back indicator string.
     * @throws {@link TypeError}
     */
    static parseBack(backIndicator: string | boolean): boolean {
        if (typeof backIndicator === "boolean") {
            return backIndicator;
        } else if (backIndicator.toUpperCase() === "B") {
            return true;
        } else if (backIndicator.toUpperCase() === 'A') {
            return false;
        } else {
            const validValues = [true, false, "A", "B", "a", "b"];
            throw new TypeError(`Input string is not valid: ${backIndicator}. Valid values are ${validValues.join(", ")}.`);
        }
    }

    /**
     * Indicates if the milepost represents Back mileage.
     */
    public get isBack(): boolean {
        return this._isBack;
    }


    public get mp(): number {
        return this._mp;
    }
    public set mp(v: number | string) {
        if (typeof v === "string") {
            this._mp = parseInt(v, 10) / 1000;
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


    constructor(mpString: string);
    constructor(mp: number, isBack: IsBackInput);
    constructor(mpStringOrNumber: string | number, isBack: IsBackInput = false) {
        super();
        if (typeof mpStringOrNumber === "string") {
            const match = mpStringOrNumber.match(Milepost._mpRe);
            if (!(match && match.length >= 3 && match.groups)) {
                throw new TypeError(`Input string "${mpStringOrNumber}" was not in expected format: ${Milepost._mpRe}.`);
            }
            const mp = match.groups["mpX1000"];
            this._mp = parseInt(mp, 10) / 1000;
            this._isBack = Milepost.parseBack(match.groups["ab"]);
        } else {
            this._mp = mpStringOrNumber;
            this._isBack = Milepost.parseBack(isBack);
        }
    }
}
