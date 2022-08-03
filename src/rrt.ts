/**
 * This module is for RRT related stuff.
 * @module
 */

export type RampFirstChar = `${"P" | "Q" | "R" | "S" | "U" | "W" | "X" | "Y"}`;
type NonZeroDigits = `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
export type RampRrtValue = `${RampFirstChar}${NonZeroDigits | "U"}`;

/**
 * @see {@link rrts}
 */
export type RrtValue =
    /** Alternate Route **/
    "AR"
    /** Couplet **/
    | "CO"
    /** Frontage Road Dec **/
    | "FD"
    /** Frontage Road Inc **/
    | "FI"
    /** Ferry Ship (Boat) **/
    | "FS"
    /** Ferry Terminal **/
    | "FT"
    /** Proposed Route **/
    | "PR"
    /** Reversible Lane **/
    | "RL"
    /** Spur **/
    | "SP"
    /** Transitional Turnback **/
    | "TB"
    /** Temporary Route **/
    | "TR"
    /** Collector Distributor Dec **/
    | "CD"
    /** Collector Distributor Inc **/
    | "CI"
    /** Crossroad within Interchange **/
    | "LX"
    /** Grade-Separated HOV-Dec **/
    | "HD"
    /** Grade-Separated HOV-Inc **/
    | "HI"
    /** Mainline (implied RRT–field is blank) **/
    | "ML"
    /** Under Construction **/
    | "UC"
    /** Ramp  */
    | RampRrtValue

export class RelatedRouteType {
    constructor(
        public readonly rrt: RrtValue,
        public readonly description: string,
        public readonly rrtType: "ramp" | "ferries" | null = null
    ) { }
}

// Define RRTs
/**
 * RRT (Related Roadway Type)
 * 
 * | RRT     | Description                  | Type    |
 * |---------|------------------------------|---------|
 * | AR      | Alternate Route              |         |
 * | CD      | Collector Distributor (Dec)  |         |
 * | CI      | Collector Distributor (Inc)  |         |
 * | CO      | Couplet                      |         |
 * | FI      | Frontage Road (Inc)          |         |
 * | FD      | Frontage Road (Dec)          |         |
 * | LX      | Crossroad within Interchange |         |
 * | RL      | Reversible Lane              |         |
 * | SP      | Spur                         |         |
 * | TB      | Transitional Turnback        |         |
 * | TR      | Temporary Route              |         |
 * | PR      | Proposed Route               |         |
 * | P1 - P9 | Off Ramp (Inc)               | Ramp    |
 * | PU      | Extension of P ramp          | Ramp    |
 * | Q1 - Q9 | On Ramp (Inc)                | Ramp    |
 * | QU      | Extension of Q ramp          | Ramp    |
 * | R1 - R9 | Off Ramp (Dec)               | Ramp    |
 * | RU      | Extension of R ramp          | Ramp    |
 * | S1 - S9 | On Ramp (Dec)                | Ramp    |
 * | SU      | Extension of S ramp          | Ramp    |
 * | FS      | Ferry Ship (Boat)            | Ferries |
 * | FT      | Ferry Terminal               | Ferries |
 */
export const rrts: { [key: string]: string | RampDescription } = {
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
    ML: "Mainline (implied RRT-field is blank)",
    UC: "Under Construction"
};

function* enumerateRrtDictionaryProperties(rrts: { [key: string]: string }) {
    for (const rrt in rrts) {
        if (Object.prototype.hasOwnProperty.call(rrts, rrt)) {
            const description = rrts[rrt];
            yield new RelatedRouteType(rrt as RrtValue, description);
        }
    }
}

export type RampDescription = `${"On" | "Off"} Ramp ${NonZeroDigits}, ${"Inc" | "Dec"}` | `${RampFirstChar} Ramp ${NonZeroDigits}`;


function* enumerateRampRrts() {
    // Add ramp RRTs.
    const rampTypes: {
        [letter: string]: ["On" | "Off", "Inc" | "Dec"];
    } = {
        P: ["Off", "Inc"],
        Q: ["On", "Inc"],
        R: ["Off", "Dec"],
        S: ["On", "Dec"]
    };

    for (const letter of ["P", "Q", "R", "S", "U", "W", "X", "Y"] as RampFirstChar[]) {
        for (let i = 1; i < 10; i++) {
            const rrt = `${letter}${i}`;
            if (letter in [..."PQRS"]) {
                const [onOrOff, incOrDec] = rampTypes[letter];
                const rrtDesc = `${onOrOff} Ramp ${i ? ` ${i}` : ""}, ${incOrDec}`;
                yield [rrt, rrtDesc] as [RampRrtValue, RampDescription];
            } else {
                const rrtDesc = `${letter} Ramp ${i}`;
                yield [rrt, rrtDesc] as [RampRrtValue, RampDescription];
            }
        }
    }
}


export const RelatedRouteTypes = new Array<RelatedRouteType>(...enumerateRrtDictionaryProperties(rrts));

for (const [rrt, desc] of enumerateRampRrts()) {
    if (desc) {
        rrts[rrt] = desc;
    }
    RelatedRouteTypes.push(new RelatedRouteType(rrt, desc || "unknown", "ramp"));
}


function* enumerateRrtMappingValues() {
    for (const rrt in rrts) {
        if (Object.prototype.hasOwnProperty.call(rrts, rrt)) {
            const description = rrts[rrt];
            yield [rrt, description] as [RrtValue, string | RampDescription]
        }
    }
}

export const rrtMapping = new Map<RrtValue, RampDescription | string>([...enumerateRrtMappingValues()]);