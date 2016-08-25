/**
 * Lookup for route shield types
 * @module route-shields
 */

/**
 * "US", "SR", "IS"
 * @typedef {string} RouteType
 */
export type ShieldType = "US" | "SR" | "IS";

/**
 * A Map that will provide a shield type for a given state route number.
 * @const {Map.<number, ShieldType>} module:route-shields
 */
export const shields = new Map<number, ShieldType>([
    [2, "US"],
    [3, "SR"],
    [4, "SR"],
    [5, "IS"],
    [6, "SR"],
    [7, "SR"],
    [8, "SR"],
    [9, "SR"],
    [10, "SR"],
    [11, "SR"],
    [12, "US"],
    [14, "SR"],
    [16, "SR"],
    [17, "SR"],
    [18, "SR"],
    [19, "SR"],
    [20, "SR"],
    [21, "SR"],
    [22, "SR"],
    [23, "SR"],
    [24, "SR"],
    [25, "SR"],
    [26, "SR"],
    [27, "SR"],
    [28, "SR"],
    [31, "SR"],
    [41, "SR"],
    [82, "IS"],
    [90, "IS"],
    [92, "SR"],
    [96, "SR"],
    [97, "US"],
    [99, "SR"],
    [100, "SR"],
    [101, "US"],
    [102, "SR"],
    [103, "SR"],
    [104, "SR"],
    [105, "SR"],
    [106, "SR"],
    [107, "SR"],
    [108, "SR"],
    [109, "SR"],
    [110, "SR"],
    [112, "SR"],
    [113, "SR"],
    [115, "SR"],
    [116, "SR"],
    [117, "SR"],
    [119, "SR"],
    [121, "SR"],
    [122, "SR"],
    [123, "SR"],
    [124, "SR"],
    [125, "SR"],
    [127, "SR"],
    [128, "SR"],
    [129, "SR"],
    [131, "SR"],
    [141, "SR"],
    [142, "SR"],
    [150, "SR"],
    [153, "SR"],
    [155, "SR"],
    [160, "SR"],
    [161, "SR"],
    [162, "SR"],
    [163, "SR"],
    [164, "SR"],
    [165, "SR"],
    [166, "SR"],
    [167, "SR"],
    [169, "SR"],
    [170, "SR"],
    [171, "SR"],
    [172, "SR"],
    [173, "SR"],
    [174, "SR"],
    [181, "SR"],
    [182, "IS"],
    [193, "SR"],
    [194, "SR"],
    [195, "US"],
    [197, "US"],
    [202, "SR"],
    [203, "SR"],
    [204, "SR"],
    [205, "IS"],
    [206, "SR"],
    [207, "SR"],
    [211, "SR"],
    [213, "SR"],
    [215, "SR"],
    [221, "SR"],
    [223, "SR"],
    [224, "SR"],
    [225, "SR"],
    [231, "SR"],
    [240, "SR"],
    [241, "SR"],
    [243, "SR"],
    [260, "SR"],
    [261, "SR"],
    [262, "SR"],
    [263, "SR"],
    [270, "SR"],
    [271, "SR"],
    [272, "SR"],
    [274, "SR"],
    [278, "SR"],
    [281, "SR"],
    [282, "SR"],
    [283, "SR"],
    [285, "SR"],
    [290, "SR"],
    [291, "SR"],
    [292, "SR"],
    [300, "SR"],
    [302, "SR"],
    [303, "SR"],
    [304, "SR"],
    [305, "SR"],
    [307, "SR"],
    [308, "SR"],
    [310, "SR"],
    [395, "US"],
    [397, "SR"],
    [401, "SR"],
    [405, "IS"],
    [409, "SR"],
    [410, "SR"],
    [411, "SR"],
    [432, "SR"],
    [433, "SR"],
    [500, "SR"],
    [501, "SR"],
    [502, "SR"],
    [503, "SR"],
    [504, "SR"],
    [505, "SR"],
    [506, "SR"],
    [507, "SR"],
    [508, "SR"],
    [509, "SR"],
    [510, "SR"],
    [512, "SR"],
    [513, "SR"],
    [515, "SR"],
    [516, "SR"],
    [518, "SR"],
    [519, "SR"],
    [520, "SR"],
    [522, "SR"],
    [523, "SR"],
    [524, "SR"],
    [525, "SR"],
    [526, "SR"],
    [527, "SR"],
    [528, "SR"],
    [529, "SR"],
    [530, "SR"],
    [531, "SR"],
    [532, "SR"],
    [534, "SR"],
    [536, "SR"],
    [538, "SR"],
    [539, "SR"],
    [542, "SR"],
    [543, "SR"],
    [544, "SR"],
    [546, "SR"],
    [547, "SR"],
    [548, "SR"],
    [599, "SR"],
    [702, "SR"],
    [704, "SR"],
    [705, "IS"],
    [706, "SR"],
    [730, "US"],
    [821, "SR"],
    [823, "SR"],
    [900, "SR"],
    [902, "SR"],
    [903, "SR"],
    [904, "SR"],
    [906, "SR"],
    [970, "SR"],
    [971, "SR"]
]);

/**
 * @function module:route-shields.getShieldType
 * @param {string} routeId - route id.
 * Only up to the first three characters (i.e., digits)
 * are used by this function.
 * @returns {string}
 */
export function getShieldType(routeId: string) {
    const re = /^\d{1,3}/;
    let match = routeId.match(re);
    if (!match) {
        throw new Error("Route must start with digits.");
    }
    let sr = parseInt(match[0], 10);
    let shield = shields.get(sr);
    return shield || null;
}

