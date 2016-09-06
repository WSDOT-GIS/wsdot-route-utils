/**
 * Lookup for route shield types
 * @module route-shields
 */
/**
 * "US", "SR", "IS"
 * @typedef {string} RouteType
 */
export declare type ShieldType = "US" | "SR" | "IS";
/**
 * @function module:route-shields.getShieldType
 * @param {string} routeId - route id.
 * Only up to the first three characters (i.e., digits)
 * are used by this function.
 * @returns {string}
 */
export declare function getShieldType(routeId: string): ShieldType;
