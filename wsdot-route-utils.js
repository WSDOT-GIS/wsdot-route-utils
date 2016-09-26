(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "./route-shields"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("./route-shields"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.routeShields);
        global.wsdotRouteUtils = mod.exports;
    }
})(this, function (exports, _routeShields) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RouteDescription = exports.relaxedWithDirRegexp = exports.relaxedRegex = exports.srdRegex = exports.srRegex = undefined;
    exports.getRouteParts = getRouteParts;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

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
    /**
     * Appends text to the end of (a copy of) a regular expression.
     * @param {RegExp} inputRe - A regular expression ending with "$".
     * @param {string} escapedText - Text to append to the end of the input RegExp.
     * @returns {RegExp} - Returns a modified copy of the input RegExp.
     * @private
     */
    function appendToRegex(inputRe, escapedText) {
        return new RegExp(inputRe.source.split("$")[0] + escapedText + "$");
    }
    /**
     * Matches state route format, with captures for SR, RRT, and RRQ. First element in array will be entire match.
     * @type {Regexp}
     * @const
     */
    var srRegex = exports.srRegex = /^(\d{3})(?:((?:AR)|(?:C[DI])|(?:C[O])|(?:F[DI])|(?:LX)|(?:[PQRS][\dU])|(?:RL)|(?:SP)|(?:TB)|(?:TR)|(?:PR)|(?:F[ST])|(?:ML))([A-Z0-9]{0,6}))?$/;
    // Detects the decrease directional indicator used in WAPR.
    var dirReSuffix = "(d)?";
    /**
     * Matches state route + optional direction format, with captures for SR, RRT, RRQ, and direction. First element in array will be entire match.
     * @type {Regexp}
     * @const
     */
    var srdRegex = exports.srdRegex = appendToRegex(srRegex, dirReSuffix);
    /**
     * A more relaxed Regexp than srRegex, which doesn't check for specific RRTs, only that they are two characters long if present.
     * @type {Regexp}
     * @const
     */
    var relaxedRegex = exports.relaxedRegex = /^(\d{3})(?:([A-Z1-9]{2})([A-Z0-9]{0,6}))?$/;
    /**
     * Like {@link relaxedRegex}, but allows optional "d" suffix.
     * @type {Regexp}
     * @see {@link relaxedRegex}
     */
    var relaxedWithDirRegexp = exports.relaxedWithDirRegexp = appendToRegex(relaxedRegex, dirReSuffix);
    // Define RRTs
    var rrts = {
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
        ML: "Mainline (implied RRT–field is blank)",
        UC: "Under Construction"
    };
    // Add ramp RRTs.
    var rampTypes = {
        P: ["Off", "Inc"],
        Q: ["On", "Inc"],
        R: ["Off", "Dec"],
        S: ["On", "Dec"]
    };
    ["P", "Q", "R", "S"].forEach(function (letter) {
        for (var i = 0; i < 10; i++) {
            var _rampTypes$letter = _slicedToArray(rampTypes[letter], 2);

            var onOrOff = _rampTypes$letter[0];
            var IncOrDec = _rampTypes$letter[1];

            rrts[letter] = onOrOff + " Ramp, " + IncOrDec;
        }
    });
    var rrqs = {
        "ABERDN": "Aberdeen"
    };
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
    function getRouteParts(routeId) {
        var throwErrorOnMatchFail = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        var canIncludeDirection = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

        if (!(routeId && typeof routeId === "string")) {
            throw new TypeError("Input must be a string.");
        }
        var re = canIncludeDirection ? srdRegex : srRegex;
        var match = routeId.match(re);
        if (match) {
            return match.splice(1).map(function (s) {
                return s || null;
            });
        } else if (throwErrorOnMatchFail) {
            throw new Error(routeId + " is not a valid WA state route identifier.");
        } else {
            return null;
        }
    }
    /**
     * Provides a description of a route.
     * @class module:wsdot-route-utils.RouteDescription
     */

    var RouteDescription = exports.RouteDescription = function () {
        /**
         * Creates new instance.
         * @param {string} routeId - route ID
         * @param {boolean} [canIncludeDirection=false] - Indicates if "d" suffix is allowed in ID to show direction.
         */
        function RouteDescription(routeId) {
            var canIncludeDirection = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            _classCallCheck(this, RouteDescription);

            this._isDecrease = null;
            this._shield = undefined;
            var routeParts = getRouteParts(routeId, true, canIncludeDirection);
            if (canIncludeDirection) {
                var d = void 0;
                if (routeParts !== null) {
                    var _routeParts = _slicedToArray(routeParts, 4);

                    this._sr = _routeParts[0];
                    this._rrt = _routeParts[1];
                    this._rrq = _routeParts[2];
                    d = _routeParts[3];

                    this._isDecrease = d === "d";
                }
            } else {
                if (routeParts != null) {
                    var _routeParts2 = _slicedToArray(routeParts, 3);

                    this._sr = _routeParts2[0];
                    this._rrt = _routeParts2[1];
                    this._rrq = _routeParts2[2];
                }
            }
        }
        /**
         * Gets the type of shield of a WA state route: "IS", "US", or "SR"
         */


        _createClass(RouteDescription, [{
            key: "toString",

            /**
             * Returns the route as a string.
             * @returns {string}
             */
            value: function toString() {
                return "" + this.sr + (this.rrt || "") + (this.rrq || "") + (this.isDecrease === true ? "d" : "");
            }
        }, {
            key: "shield",
            get: function get() {
                if (this._shield === undefined) {
                    if (!this.sr) {
                        this._shield = null;
                    } else {
                        this._shield = (0, _routeShields.getShieldType)(this.sr) || null;
                    }
                }
                return this._shield;
            }
            /**
             * Mainline component of route ID.
             * @member {string}
             */

        }, {
            key: "sr",
            get: function get() {
                return this._sr;
            }
            /**
             * Related Route Type (RRT) component.
             * @member {string}
             */

        }, {
            key: "rrt",
            get: function get() {
                return this._rrt;
            }
            /**
             * Related Route Qualifier (RRQ).
             * @member {string}
             */

        }, {
            key: "rrq",
            get: function get() {
                return this._rrq;
            }
            /**
             * Indicates if this is a mainline route ID.
             * I.e., no RRT or RRQ.
             */

        }, {
            key: "isMainline",
            get: function get() {
                return !this.rrt && !this.rrq;
            }
            /**
             * Indicates decreasing direction was specified.
             * If the "canIncludeDirection" option was set to false
             * in the constructor, this value will be null.
             * @member {boolean}
             */

        }, {
            key: "isDecrease",
            get: function get() {
                return this._isDecrease;
            }
            /**
             * More detailed description of the RRT.
             * @member {string}
             */

        }, {
            key: "rrtDescription",
            get: function get() {
                return this.rrt ? rrts[this.rrt] : null;
            }
            /**
             * If applicable, milepost where this route either leaves or joins the mainline.
             * Value will be null when not applicable.
             * @member {number}
             */

        }, {
            key: "mainlineConnectionMP",
            get: function get() {
                if (this.rrq && /^\d+$/.test(this.rrq)) {
                    return parseInt(this.rrq, 10) / 100;
                } else {
                    return null;
                }
            }
            /**
             * Indicates if the route is a "local collector" type.
             * @returns {boolean}
             */

        }, {
            key: "isLocalColector",
            get: function get() {
                return !!this.rrt && /((LX)|(F[DI]))/.test(this.rrt);
            }
            /**
             * Indicates if the route is a ramp.
             * @returns {boolean}
             */

        }, {
            key: "isRamp",
            get: function get() {
                return !!this.rrt && /[PQRS][1-9]/.test(this.rrt);
            }
            /**
             * Detailed description of the RRQ.
             * @member {string}
             */

        }, {
            key: "rrqDescription",
            get: function get() {
                if (!this.rrq) {
                    return null;
                } else if (rrqs.hasOwnProperty(this.rrq)) {
                    return rrqs[this.rrq];
                } else if (typeof this.mainlineConnectionMP === "number") {
                    return "at milepost " + this.mainlineConnectionMP;
                } else {
                    return this.rrq;
                }
            }
        }]);

        return RouteDescription;
    }();
});