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
const srRegex = /^(\d{3})(?:((?:AR)|(?:C[DI])|(?:C[O])|(?:F[DI])|(?:LX)|(?:[PQRS][\dU])|(?:RL)|(?:SP)|(?:TB)|(?:TR)|(?:PR)|(?:F[ST])|(?:ML))([A-Z0-9]{0,6}))?$/i;

export default srRegex;

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
export function getRouteParts(routeId: string, throwErrorOnMatchFail: boolean = false) {
    if (!(routeId && typeof routeId === "string")) {
        throw new TypeError("Input must be a string.");
    }
    let match = routeId.match(srRegex);
    if (match) {
        return match.splice(1).map(s => {
            return s || null;
        });
    } else if (throwErrorOnMatchFail) {
        throw new Error(`${routeId} is not a valid WA state route identifier.`);
    }
    return null;
}