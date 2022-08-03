/**
 * Lookup for route shield types
 * @module route-shields
 */

import FormatError from "./FormatError.js";

/**
 * Route Type: "US", "SR", "IS"
 */
export type ShieldType = "US" | "SR" | "IS";

/**
 * Prefix
 */
export type Prefix = "US" | "SR" | "I";

export type MultiStatePrefix = "US" | "WA" | "I";

// Create a symbol for each route shield type.
/**
 * @private
 */
const US_SYMBOL = Symbol("US");
/**
 * @private
 */
const IS_SYMBOL = Symbol("IS");
/**
 * @private
 */
const SR_SYMBOL = Symbol("SR");

/**
 * @private
 */
const shieldTypes = new Map<symbol, ShieldType>([
  [US_SYMBOL, "US"],
  [IS_SYMBOL, "IS"],
  [SR_SYMBOL, "SR"]
]);

/**
 * A Map that will provide a shield type for a given state route number.
 * @private
 */
const shields = new Map<number, symbol>([
  [2, US_SYMBOL],
  [3, SR_SYMBOL],
  [4, SR_SYMBOL],
  [5, IS_SYMBOL],
  [6, SR_SYMBOL],
  [7, SR_SYMBOL],
  [8, SR_SYMBOL],
  [9, SR_SYMBOL],
  [10, SR_SYMBOL],
  [11, SR_SYMBOL],
  [12, US_SYMBOL],
  [14, SR_SYMBOL],
  [16, SR_SYMBOL],
  [17, SR_SYMBOL],
  [18, SR_SYMBOL],
  [19, SR_SYMBOL],
  [20, SR_SYMBOL],
  [21, SR_SYMBOL],
  [22, SR_SYMBOL],
  [23, SR_SYMBOL],
  [24, SR_SYMBOL],
  [25, SR_SYMBOL],
  [26, SR_SYMBOL],
  [27, SR_SYMBOL],
  [28, SR_SYMBOL],
  [31, SR_SYMBOL],
  [41, SR_SYMBOL],
  [82, IS_SYMBOL],
  [90, IS_SYMBOL],
  [92, SR_SYMBOL],
  [96, SR_SYMBOL],
  [97, US_SYMBOL],
  [99, SR_SYMBOL],
  [100, SR_SYMBOL],
  [101, US_SYMBOL],
  [102, SR_SYMBOL],
  [103, SR_SYMBOL],
  [104, SR_SYMBOL],
  [105, SR_SYMBOL],
  [106, SR_SYMBOL],
  [107, SR_SYMBOL],
  [108, SR_SYMBOL],
  [109, SR_SYMBOL],
  [110, SR_SYMBOL],
  [112, SR_SYMBOL],
  [113, SR_SYMBOL],
  [115, SR_SYMBOL],
  [116, SR_SYMBOL],
  [117, SR_SYMBOL],
  [119, SR_SYMBOL],
  [121, SR_SYMBOL],
  [122, SR_SYMBOL],
  [123, SR_SYMBOL],
  [124, SR_SYMBOL],
  [125, SR_SYMBOL],
  [127, SR_SYMBOL],
  [128, SR_SYMBOL],
  [129, SR_SYMBOL],
  [131, SR_SYMBOL],
  [141, SR_SYMBOL],
  [142, SR_SYMBOL],
  [150, SR_SYMBOL],
  [153, SR_SYMBOL],
  [155, SR_SYMBOL],
  [160, SR_SYMBOL],
  [161, SR_SYMBOL],
  [162, SR_SYMBOL],
  [163, SR_SYMBOL],
  [164, SR_SYMBOL],
  [165, SR_SYMBOL],
  [166, SR_SYMBOL],
  [167, SR_SYMBOL],
  [169, SR_SYMBOL],
  [170, SR_SYMBOL],
  [171, SR_SYMBOL],
  [172, SR_SYMBOL],
  [173, SR_SYMBOL],
  [174, SR_SYMBOL],
  [181, SR_SYMBOL],
  [182, IS_SYMBOL],
  [193, SR_SYMBOL],
  [194, SR_SYMBOL],
  [195, US_SYMBOL],
  [197, US_SYMBOL],
  [202, SR_SYMBOL],
  [203, SR_SYMBOL],
  [204, SR_SYMBOL],
  [205, IS_SYMBOL],
  [206, SR_SYMBOL],
  [207, SR_SYMBOL],
  [211, SR_SYMBOL],
  [213, SR_SYMBOL],
  [215, SR_SYMBOL],
  [221, SR_SYMBOL],
  [223, SR_SYMBOL],
  [224, SR_SYMBOL],
  [225, SR_SYMBOL],
  [231, SR_SYMBOL],
  [240, SR_SYMBOL],
  [241, SR_SYMBOL],
  [243, SR_SYMBOL],
  [260, SR_SYMBOL],
  [261, SR_SYMBOL],
  [262, SR_SYMBOL],
  [263, SR_SYMBOL],
  [270, SR_SYMBOL],
  [271, SR_SYMBOL],
  [272, SR_SYMBOL],
  [274, SR_SYMBOL],
  [278, SR_SYMBOL],
  [281, SR_SYMBOL],
  [282, SR_SYMBOL],
  [283, SR_SYMBOL],
  [285, SR_SYMBOL],
  [290, SR_SYMBOL],
  [291, SR_SYMBOL],
  [292, SR_SYMBOL],
  [300, SR_SYMBOL],
  [302, SR_SYMBOL],
  [303, SR_SYMBOL],
  [304, SR_SYMBOL],
  [305, SR_SYMBOL],
  [307, SR_SYMBOL],
  [308, SR_SYMBOL],
  [310, SR_SYMBOL],
  [395, US_SYMBOL],
  [397, SR_SYMBOL],
  [401, SR_SYMBOL],
  [405, IS_SYMBOL],
  [409, SR_SYMBOL],
  [410, SR_SYMBOL],
  [411, SR_SYMBOL],
  [432, SR_SYMBOL],
  [433, SR_SYMBOL],
  [500, SR_SYMBOL],
  [501, SR_SYMBOL],
  [502, SR_SYMBOL],
  [503, SR_SYMBOL],
  [504, SR_SYMBOL],
  [505, SR_SYMBOL],
  [506, SR_SYMBOL],
  [507, SR_SYMBOL],
  [508, SR_SYMBOL],
  [509, SR_SYMBOL],
  [510, SR_SYMBOL],
  [512, SR_SYMBOL],
  [513, SR_SYMBOL],
  [515, SR_SYMBOL],
  [516, SR_SYMBOL],
  [518, SR_SYMBOL],
  [519, SR_SYMBOL],
  [520, SR_SYMBOL],
  [522, SR_SYMBOL],
  [523, SR_SYMBOL],
  [524, SR_SYMBOL],
  [525, SR_SYMBOL],
  [526, SR_SYMBOL],
  [527, SR_SYMBOL],
  [528, SR_SYMBOL],
  [529, SR_SYMBOL],
  [530, SR_SYMBOL],
  [531, SR_SYMBOL],
  [532, SR_SYMBOL],
  [534, SR_SYMBOL],
  [536, SR_SYMBOL],
  [538, SR_SYMBOL],
  [539, SR_SYMBOL],
  [542, SR_SYMBOL],
  [543, SR_SYMBOL],
  [544, SR_SYMBOL],
  [546, SR_SYMBOL],
  [547, SR_SYMBOL],
  [548, SR_SYMBOL],
  [599, SR_SYMBOL],
  [702, SR_SYMBOL],
  [704, SR_SYMBOL],
  [705, IS_SYMBOL],
  [706, SR_SYMBOL],
  [730, US_SYMBOL],
  [821, SR_SYMBOL],
  [823, SR_SYMBOL],
  [900, SR_SYMBOL],
  [902, SR_SYMBOL],
  [903, SR_SYMBOL],
  [904, SR_SYMBOL],
  [906, SR_SYMBOL],
  [970, SR_SYMBOL],
  [971, SR_SYMBOL]
]);

/**
 * Gets the shield type associated with the given route.
 * @param routeId - route id.
 * Only up to the first three characters (i.e., digits)
 * are used by this function.
 * @throws {TypeError} thrown if routeId is neither string nor number.
 */
export function getShieldType(routeId: string | number): ShieldType | null {
  let sr: number;
  if (typeof routeId === "number") {
    sr = routeId;
  } else if (typeof routeId === "string") {
    const re = /^\d{1,3}/;
    const match = routeId.match(re);
    if (!match) {
      throw new FormatError(routeId, re);
    }
    sr = parseInt(match[0], 10);
  } else {
    throw new TypeError("routeID must be either number or string");
  }
  const shield = shields.get(sr);
  return shield ? shieldTypes.get(shield) || null : null;
}

/**
 * Gets the prefix for a given route ID
 * @param routeId - Route identifier
 * @param useWAForSR - WA state maps prefix state routes with "SR".
 * Other maps such as OpenStreetMap and Google instead prefix them with "WA",
 * since their maps deal with more than one state.
 * Set this value to true to get "WA" instead of "SR".
 * @throws {TypeError} thrown if routeId is neither string nor number.
 */
export function getPrefix(
  routeId: string | number,
  useWAForSR = false
) {
  const shield = getShieldType(routeId);
  if (shield === null) {
    return shield;
  }

  if (shield === "IS") {
    return "I";
  } else if (shield === "SR" && useWAForSR) {
    return "WA";
  } else {
    return shield;
  }
}
