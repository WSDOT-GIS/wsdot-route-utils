import FormatError from "./FormatError.js";
import type { BackIndicator, IsBackInput } from "./RouteName.js";

/**
 * Represents a WA state route milepost, consisting of a numeric and "is back" boolean value.
 */
export class Milepost extends Object {
  protected _isBack: boolean;
  private _mp: number;

  /**
   * Matches milepost info from a Roads & Highways route name.
   */
  public static milepostRegex = /^(?<mp>\d+)(?<ab>[AB])?$/i;

  /**
   * Parses a string into a boolean value: `true` for back mileage,
   * or `false` otherwise.
   * @param backIndicator - Input string.
   * * If this parameter is boolean, this function will simply return the same value.
   * * If value is `null` or `undefined`, `false` is returned.
   * * If value is a string matching `"B"` or `"b"`, `true` is returned.
   * @returns A boolean equivalent of input back indicator string.
   */
  static parseBack(backIndicator: null | undefined): false;
  static parseBack(backIndicator: "B" | "b"): true;
  static parseBack(backIndicator: string | boolean): boolean;
  static parseBack(
    backIndicator: string | boolean | null | undefined
  ): boolean {
    if (typeof backIndicator === "boolean") {
      return backIndicator;
    }
    if (typeof backIndicator === "string" && /^B$/i.test(backIndicator)) {
      return true;
    }
    return false;
  }

  /**
   * Indicates if the milepost represents Back mileage.
   */
  public get isBack(): boolean {
    return this._isBack;
  }

  /**
   * The mileage value.
   */
  public get mp(): number {
    return this._mp;
  }

  /**
   * This value will be "B" if {@link isBack} is true, "A" otherwise.
   * @deprecated - This property was poorly named. You should instead use {@link backAsChar}.
   */
  public get mpAsChar(): BackIndicator {
    return this.backAsChar;
  }

  /**
   * This value will be "B" if {@link isBack} is true, "A" otherwise.
   */
  public get backAsChar(): BackIndicator {
    return this.isBack ? "B" : "A";
  }

  /**
   * Returns a string representation of the {@link Milepost}, including a "B" suffix for back mileage.
   * @param forceA - If set to true and if {@link isBack} is false, an "A" will be appended to the end of the output string.
   * @returns A string representation of this object.
   */
  override toString(forceA: true): `${number}${BackIndicator}`;
  override toString(forceA: false): `${number}${"B" | ""}`;
  override toString(): `${number}${"B" | ""}`;
  override toString(forceA = false) {
    if (!forceA && !this.isBack) {
      return this.mp.toString(10) as `${number}`;
    }
    return `${this.mp}${this.backAsChar}` as `${number}${BackIndicator}`;
  }

  /**
   * Parses the milepost portion of a Roads and Highways route name.
   * @param input - Milepost portion of a Roads and Highways route name.
   * * Note that the mileage portion will be multiplied by 1000 in a R & H route name.
   * * Input **must** end with either an "A" or a "B".
   * @returns A {@link Milepost} equivalent of the input string.
   */
  public static parseFromRoadsAndHighways(input: `${number}${BackIndicator}`) {
    // Regexp will match a string of digits followed by either A or B.
    const rhMPRe = /^(?<mp>\d+)(?<ab>[AB])$/i;
    // Check to see if the input string matches the expected format.
    const match = input.match(rhMPRe);
    if (!(match && match.length >= 3 && match.groups)) {
      throw new FormatError(input, rhMPRe);
    }
    const mp = parseInt(match.groups["mp"], 10) / 1000;
    const isBack = Milepost.parseBack(match.groups["ab"] as "A" | "B");

    return new Milepost(mp, isBack);
  }

  /**
   * Creates a new Milepost instance.
   * @param mpString - A string representation of an integer
   */
  constructor(mpString: `${number}${"B" | "A" | ""}`);
  /**
   * Creates a new Milepost instance.
   * @param mp - Milepost value
   * @param isBack - Indicate back mileage.
   */
  constructor(mp: number, isBack?: IsBackInput);
  /**
   * Creates a new Milepost instance.
   * @param mpStringOrNumber - Either an integer number or a string representation of one.
   * @param isBack - boolean or string indicating whether milepost is back mileage.
   */
  constructor(mpStringOrNumber: string | number, isBack: IsBackInput = false) {
    super();
    if (typeof mpStringOrNumber === "string") {
      const match = mpStringOrNumber.match(Milepost.milepostRegex);
      if (!(match && match.length >= 3 && match.groups)) {
        throw new FormatError(mpStringOrNumber, Milepost.milepostRegex);
      }
      const mp = match.groups["mp"];
      this._mp = parseInt(mp, 10);
      this._isBack = Milepost.parseBack(match.groups["ab"]);
    } else {
      this._mp = mpStringOrNumber;
      this._isBack = Milepost.parseBack(isBack);
    }
  }
}
