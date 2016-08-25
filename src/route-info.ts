/**
 * Provides information about state routes.
 * @module route-info
 */

import "babel-polyfill"; // Allows generator functions to be transpiled.

/**
 * @enum module:route-info.RouteDirections
 */
export enum RouteDirections {
    /**
     * Increase
     * @type number
     * @value 1
     */
    INCREASE = 1,
    /**
     * Decrease
     * @type number
     * @value 2
     */
    DECREASE = 2,
    /**
     * Both increase and decrease
     * @type number
     * @value 3
     */
    BOTH = 3
}

/**
 * "US", "SR", "IS"
 * @typedef {string} RouteType
 */
export type RouteType = "US" | "SR" | "IS";

const routes: [string, RouteType, RouteDirections][] = [
    ["002", "US", 3],
    ["002COBROWNE", "US", 1],
    ["002CODIVISN", "US", 1],
    ["002CONEWPRT", "US", 3],
    ["003", "SR", 3],
    ["004", "SR", 3],
    ["004COKELSO", "SR", 3],
    ["005", "IS", 3],
    ["005HD15463", "IS", 1],
    ["005HD15602", "IS", 1],
    ["005HI15420", "IS", 1],
    ["005RL005EXP", "IS", 3],
    ["006", "SR", 3],
    ["007", "SR", 3],
    ["008", "SR", 3],
    ["009", "SR", 3],
    ["009SPSUMAS", "SR", 3],
    ["010", "SR", 3],
    ["011", "SR", 3],
    ["012", "US", 3],
    ["012COABERDN", "US", 1],
    ["014", "SR", 3],
    ["014SPMARYHL", "SR", 3],
    ["016", "SR", 3],
    ["016AR", "SR", 1],
    ["016SPGORST", "SR", 3],
    ["017", "SR", 3],
    ["018", "SR", 3],
    ["019", "SR", 3],
    ["020", "SR", 3],
    ["020SPANACRT", "SR", 3],
    ["021", "SR", 3],
    ["022", "SR", 3],
    ["023", "SR", 3],
    ["024", "SR", 3],
    ["025", "SR", 3],
    ["026", "SR", 3],
    ["026SPCOLFAX", "SR", 3],
    ["027", "SR", 3],
    ["028", "SR", 3],
    ["028COWENTCH", "SR", 1],
    ["028SPWENTCH", "SR", 3],
    ["031", "SR", 3],
    ["041", "SR", 3],
    ["082", "IS", 3],
    ["090", "IS", 3],
    ["090RL090EXP", "IS", 3],
    ["092", "SR", 3],
    ["092SPGRANIT", "SR", 3],
    ["096", "SR", 3],
    ["097", "US", 3],
    ["097AR", "US", 3],
    ["097COMARYHL", "US", 3],
    ["097SPORONDO", "US", 3],
    ["099", "SR", 3],
    ["099COVIADCT", "SR", 1],
    ["100", "SR", 3],
    ["100SPCANBY", "SR", 3],
    ["101", "US", 3],
    ["101AR", "US", 3],
    ["101COABERDN", "US", 3],
    ["101COHERON", "US", 1],
    ["101COPRTANG", "US", 3],
    ["102", "SR", 3],
    ["103", "SR", 3],
    ["104", "SR", 3],
    ["104COKNGSTN", "SR", 1],
    ["104SPAURORA", "SR", 3],
    ["105", "SR", 3],
    ["105SPBOONE", "SR", 3],
    ["105SPWESTPT", "SR", 3],
    ["106", "SR", 3],
    ["107", "SR", 3],
    ["108", "SR", 3],
    ["109", "SR", 3],
    ["109COHQUIAM", "SR", 1],
    ["109SPLONNGR", "SR", 3],
    ["110", "SR", 3],
    ["110SPMORA", "SR", 3],
    ["112", "SR", 3],
    ["113", "SR", 3],
    ["115", "SR", 3],
    ["116", "SR", 3],
    ["117", "SR", 3],
    ["119", "SR", 3],
    ["121", "SR", 3],
    ["122", "SR", 3],
    ["123", "SR", 3],
    ["124", "SR", 3],
    ["125", "SR", 3],
    ["125SP125SP", "SR", 3],
    ["127", "SR", 3],
    ["128", "SR", 3],
    ["129", "SR", 3],
    ["129SP6THST", "SR", 3],
    ["131", "SR", 3],
    ["141", "SR", 3],
    ["141SPUNDRWD", "SR", 3],
    ["142", "SR", 3],
    ["150", "SR", 3],
    ["153", "SR", 3],
    ["155", "SR", 3],
    ["155SPOMAK", "SR", 3],
    ["160", "SR", 3],
    ["161", "SR", 3],
    ["162", "SR", 3],
    ["163", "SR", 3],
    ["164", "SR", 3],
    ["165", "SR", 3],
    ["166", "SR", 3],
    ["167", "SR", 3],
    ["169", "SR", 3],
    ["170", "SR", 3],
    ["171", "SR", 3],
    ["172", "SR", 3],
    ["173", "SR", 3],
    ["174", "SR", 3],
    ["174SPCRWNPT", "SR", 3],
    ["174SPLEAHY", "SR", 3],
    ["181", "SR", 3],
    ["182", "IS", 3],
    ["193", "SR", 3],
    ["194", "SR", 3],
    ["195", "US", 3],
    ["195SPGNESSE", "US", 3],
    ["197", "US", 3],
    ["202", "SR", 3],
    ["202COREDMND", "SR", 1],
    ["203", "SR", 3],
    ["204", "SR", 3],
    ["205", "IS", 3],
    ["206", "SR", 3],
    ["207", "SR", 3],
    ["211", "SR", 3],
    ["213", "SR", 3],
    ["215", "SR", 3],
    ["221", "SR", 3],
    ["223", "SR", 3],
    ["224", "SR", 3],
    ["225", "SR", 3],
    ["231", "SR", 3],
    ["240", "SR", 3],
    ["241", "SR", 3],
    ["243", "SR", 3],
    ["260", "SR", 3],
    ["261", "SR", 3],
    ["262", "SR", 3],
    ["263", "SR", 3],
    ["270", "SR", 3],
    ["270COPULLMN", "SR", 1],
    ["271", "SR", 3],
    ["272", "SR", 3],
    ["274", "SR", 3],
    ["278", "SR", 3],
    ["281", "SR", 3],
    ["281SPBURKE", "SR", 3],
    ["282", "SR", 3],
    ["283", "SR", 3],
    ["285", "SR", 3],
    ["285COWENTCH", "SR", 3],
    ["290", "SR", 3],
    ["291", "SR", 3],
    ["292", "SR", 3],
    ["300", "SR", 3],
    ["302", "SR", 3],
    ["302SPPURDY", "SR", 3],
    ["303", "SR", 3],
    ["304", "SR", 3],
    ["304COTUNNEL", "SR", 1],
    ["305", "SR", 3],
    ["307", "SR", 3],
    ["308", "SR", 3],
    ["310", "SR", 3],
    ["395", "US", 3],
    ["395SPNSC", "US", 3],
    ["397", "SR", 3],
    ["401", "SR", 3],
    ["405", "IS", 3],
    ["405HI01093", "IS", 1],
    ["409", "SR", 3],
    ["410", "SR", 3],
    ["411", "SR", 3],
    ["432", "SR", 3],
    ["433", "SR", 3],
    ["500", "SR", 3],
    ["501", "SR", 3],
    ["501COVANCVR", "SR", 1],
    ["502", "SR", 3],
    ["503", "SR", 3],
    ["503SPCOUGAR", "SR", 3],
    ["504", "SR", 3],
    ["504SPOLD504", "SR", 3],
    ["505", "SR", 3],
    ["506", "SR", 3],
    ["507", "SR", 3],
    ["507COPEARL", "SR", 1],
    ["508", "SR", 3],
    ["509", "SR", 3],
    ["510", "SR", 3],
    ["510SPYELMLP", "SR", 3],
    ["512", "SR", 3],
    ["513", "SR", 3],
    ["515", "SR", 3],
    ["516", "SR", 3],
    ["518", "SR", 3],
    ["519", "SR", 3],
    ["520", "SR", 3],
    ["522", "SR", 3],
    ["523", "SR", 3],
    ["524", "SR", 3],
    ["524SP3RDAVE", "SR", 3],
    ["524SPCEDRWY", "SR", 3],
    ["525", "SR", 3],
    ["525SPPAINE", "SR", 3],
    ["526", "SR", 3],
    ["527", "SR", 3],
    ["528", "SR", 3],
    ["529", "SR", 3],
    ["529SPEVERET", "SR", 3],
    ["530", "SR", 3],
    ["531", "SR", 3],
    ["532", "SR", 3],
    ["534", "SR", 3],
    ["536", "SR", 3],
    ["538", "SR", 3],
    ["539", "SR", 3],
    ["539COLYNDEN", "SR", 3],
    ["539SPLYNDEN", "SR", 3],
    ["542", "SR", 3],
    ["542COMTBAKR", "SR", 1],
    ["543", "SR", 3],
    ["544", "SR", 3],
    ["546", "SR", 3],
    ["547", "SR", 3],
    ["548", "SR", 3],
    ["599", "SR", 3],
    ["702", "SR", 3],
    ["704", "SR", 3],
    ["705", "IS", 3],
    ["706", "SR", 3],
    ["730", "US", 3],
    ["730SPWALULA", "US", 3],
    ["821", "SR", 3],
    ["823", "SR", 3],
    ["900", "SR", 3],
    ["900CO2NDST", "SR", 1],
    ["902", "SR", 3],
    ["903", "SR", 3],
    ["903SPCLEELM", "SR", 3],
    ["904", "SR", 3],
    ["906", "SR", 3],
    ["906SPHYAK", "SR", 3],
    ["970", "SR", 3],
    ["971", "SR", 3]
];

/**
 * @class module:route-info.RouteInfo
 * @member {string} id - id
 * @member {string} type - Route Type: "US", "IS", or "SR"
 * @member {number} direction - 1 = Increase, 2 = Decrease, 3 = Both
 */
export class RouteInfo {
    constructor(public id: string, public type: RouteType, public direction: RouteDirections) { }

    /**
     * Indicates if the route has an increasing component.
     * @returns {boolean}
     */
    public get isIncrease(): boolean {
        return (this.direction & RouteDirections.INCREASE) === RouteDirections.INCREASE;
    }

    /**
     * Indicates if the route has an decreasing component.
     * @returns {boolean}
     */
    public get isDecrease(): boolean {
        return (this.direction & RouteDirections.DECREASE) === RouteDirections.DECREASE;
    }


    /**
     * Indicates if the route has both increasing and decreasing components.
     * @returns {boolean}
     */
    public get isBoth(): boolean {
        return (this.direction & RouteDirections.BOTH) === RouteDirections.BOTH;
    }


}

/**
 * Generator function for looping through the route infos.
 * @returns {module:route-info.RouteInfo}
 */
export default function* iterator() {
    for (let [id, type, dir] of routes) {
        yield new RouteInfo(id, type, dir);
    }
}

/**
 * @function module:route-info.getRouteInfo
 * @param {string} routeId - route id
 * @returns {module:route-info.RouteInfo}
 */
export function getRouteInfo(routeId: string): RouteInfo {
    for (let route of iterator()) {
        if (route.id === routeId) {
            return route;
        }
    }
    return null;
}

