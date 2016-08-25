wsdot-route-utils
=================

Utilities for working with Washington state route identifiers.

[![Build Status](https://travis-ci.org/WSDOT-GIS/wsdot-route-utils.svg?branch=master)](https://travis-ci.org/WSDOT-GIS/wsdot-route-utils)

[![bitHound Overall Score](https://www.bithound.io/github/WSDOT-GIS/wsdot-route-utils/badges/score.svg)](https://www.bithound.io/github/WSDOT-GIS/wsdot-route-utils)
[![bitHound Dependencies](https://www.bithound.io/github/WSDOT-GIS/wsdot-route-utils/badges/dependencies.svg)](https://www.bithound.io/github/WSDOT-GIS/wsdot-route-utils/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/WSDOT-GIS/wsdot-route-utils/badges/devDependencies.svg)](https://www.bithound.io/github/WSDOT-GIS/wsdot-route-utils/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/WSDOT-GIS/wsdot-route-utils/badges/code.svg)](https://www.bithound.io/github/WSDOT-GIS/wsdot-route-utils)

[![npm](https://img.shields.io/npm/l/wsdot-route-utils.svg?maxAge=2592000)](http://unlicense.org)
[![npm](https://img.shields.io/npm/v/wsdot-route-utils.svg?maxAge=2592000)](https://www.npmjs.com/package/wsdot-route-utils)
[![npm](https://img.shields.io/npm/dm/wsdot-route-utils.svg?maxAge=2592000)](https://www.npmjs.com/package/wsdot-route-utils)
[![node](https://img.shields.io/node/v/wsdot-route-utils.svg?maxAge=2592000)](https://www.npmjs.com/package/wsdot-route-utils)


Get from NPM
------------

        npm install --save wsdot-route-utils

Sample
------

### Load module ###

```javascript
let wsdotRouteUtils = require("wsdot-route-utils");
let RouteDescription = wsdotRouteUtils.RouteDescription;
let getRouteParts = wsdotRouteUtils.getRouteParts;
```


### Get info about a route ID ###

```javascript
const srid = "101COABERDN";
let desc = new RouteDescription(srid);
console.log(desc.sr); // "101""
console.log(desc.rrt); // "CO"
console.log(desc.rrq); // "ABERDN"
console.log(desc.rrtDescription); // "Couplet"
console.log(desc.rrqDescription); // "Aberdeen" (description may sometimes be just the same as `rrq`).
console.log(desc.mainlineConnectionMP); // null
```

```javascript
const srid = "005R109958";
let desc = new RouteDescription(srid);
console.log(desc.sr); // "005""
console.log(desc.rrt); // "R1"
console.log(desc.rrq); // "09958"
console.log(desc.rrtDescription); // "Off Ramp, Dec"
console.log(desc.rrqDescription); // "at milepost 99.58"
console.log(desc.mainlineConnectionMP); // 99.58

```


API
---

## Modules

<dl>
<dt><a href="#module_route-info">route-info</a></dt>
<dd></dd>
<dt><a href="#module_wsdot-route-utils">wsdot-route-utils</a></dt>
<dd><p>Utilities for WSDOT Route Identifiers</p>
</dd>
</dl>

<a name="module_route-info"></a>

## route-info

* [route-info](#module_route-info)
    * [module.exports()](#exp_module_route-info--module.exports) ⇒ <code>module:route-info.RouteInfo</code> ⏏
        * _static_
            * [.RouteDirections](#module_route-info--module.exports.RouteDirections)
            * [.getRouteInfo(routeId)](#module_route-info--module.exports.getRouteInfo) ⇒ <code>module:route-info--module.exports.RouteInfo</code>
        * _inner_
            * [~direction](#module_route-info--module.exports..direction) : <code>string</code>

<a name="exp_module_route-info--module.exports"></a>

### module.exports() ⇒ <code>module:route-info.RouteInfo</code> ⏏
Generator function for looping through the route infos.

**Kind**: Exported function  
<a name="module_route-info--module.exports.RouteDirections"></a>

#### module.exports.RouteDirections
**Kind**: static enum of <code>[module.exports](#exp_module_route-info--module.exports)</code>  
<a name="module_route-info--module.exports.getRouteInfo"></a>

#### module.exports.getRouteInfo(routeId) ⇒ <code>module:route-info--module.exports.RouteInfo</code>
**Kind**: static method of <code>[module.exports](#exp_module_route-info--module.exports)</code>  

| Param | Type | Description |
| --- | --- | --- |
| routeId | <code>string</code> | route id |

<a name="module_route-info--module.exports..direction"></a>

#### module.exports~direction : <code>string</code>
id

**Kind**: inner property of <code>[module.exports](#exp_module_route-info--module.exports)</code>  
<a name="module_wsdot-route-utils"></a>

## wsdot-route-utils
Utilities for WSDOT Route Identifiers


* [wsdot-route-utils](#module_wsdot-route-utils)
    * [.RouteDescription](#module_wsdot-route-utils.RouteDescription)
        * [new RouteDescription()](#new_module_wsdot-route-utils.RouteDescription_new)
        * _instance_
            * [.sr](#module_wsdot-route-utils.RouteDescription+sr) : <code>string</code>
            * [.rrt](#module_wsdot-route-utils.RouteDescription+rrt) : <code>string</code>
            * [.rrq](#module_wsdot-route-utils.RouteDescription+rrq) : <code>string</code>
            * [.isDecrease](#module_wsdot-route-utils.RouteDescription+isDecrease) : <code>boolean</code>
            * [.rrtDescription](#module_wsdot-route-utils.RouteDescription+rrtDescription) : <code>string</code>
            * [.mainlineConnectionMP](#module_wsdot-route-utils.RouteDescription+mainlineConnectionMP) : <code>number</code>
            * [.isLocalColector](#module_wsdot-route-utils.RouteDescription+isLocalColector) ⇒ <code>boolean</code>
            * [.isRamp](#module_wsdot-route-utils.RouteDescription+isRamp) ⇒ <code>boolean</code>
            * [.rrqDescription](#module_wsdot-route-utils.RouteDescription+rrqDescription) : <code>string</code>
            * [.toString()](#module_wsdot-route-utils.RouteDescription+toString) ⇒ <code>string</code>
        * _static_
            * [.RouteDescription](#module_wsdot-route-utils.RouteDescription.RouteDescription)
                * [new RouteDescription(routeId, canIncludeDirection)](#new_module_wsdot-route-utils.RouteDescription.RouteDescription_new)
    * [.srRegex](#module_wsdot-route-utils.srRegex) : <code>Regexp</code>
    * [.srdRegex](#module_wsdot-route-utils.srdRegex) : <code>Regexp</code>
    * [.relaxedRegex](#module_wsdot-route-utils.relaxedRegex) : <code>Regexp</code>
    * [.relaxedWithDirRegexp](#module_wsdot-route-utils.relaxedWithDirRegexp) : <code>Regexp</code>
    * [.getRouteParts(routeId, [throwErrorOnMatchFail])](#module_wsdot-route-utils.getRouteParts) ⇒ <code>Array.&lt;string&gt;</code>

<a name="module_wsdot-route-utils.RouteDescription"></a>

### wsdot-route-utils.RouteDescription
**Kind**: static class of <code>[wsdot-route-utils](#module_wsdot-route-utils)</code>  

* [.RouteDescription](#module_wsdot-route-utils.RouteDescription)
    * [new RouteDescription()](#new_module_wsdot-route-utils.RouteDescription_new)
    * _instance_
        * [.sr](#module_wsdot-route-utils.RouteDescription+sr) : <code>string</code>
        * [.rrt](#module_wsdot-route-utils.RouteDescription+rrt) : <code>string</code>
        * [.rrq](#module_wsdot-route-utils.RouteDescription+rrq) : <code>string</code>
        * [.isDecrease](#module_wsdot-route-utils.RouteDescription+isDecrease) : <code>boolean</code>
        * [.rrtDescription](#module_wsdot-route-utils.RouteDescription+rrtDescription) : <code>string</code>
        * [.mainlineConnectionMP](#module_wsdot-route-utils.RouteDescription+mainlineConnectionMP) : <code>number</code>
        * [.isLocalColector](#module_wsdot-route-utils.RouteDescription+isLocalColector) ⇒ <code>boolean</code>
        * [.isRamp](#module_wsdot-route-utils.RouteDescription+isRamp) ⇒ <code>boolean</code>
        * [.rrqDescription](#module_wsdot-route-utils.RouteDescription+rrqDescription) : <code>string</code>
        * [.toString()](#module_wsdot-route-utils.RouteDescription+toString) ⇒ <code>string</code>
    * _static_
        * [.RouteDescription](#module_wsdot-route-utils.RouteDescription.RouteDescription)
            * [new RouteDescription(routeId, canIncludeDirection)](#new_module_wsdot-route-utils.RouteDescription.RouteDescription_new)

<a name="new_module_wsdot-route-utils.RouteDescription_new"></a>

#### new RouteDescription()
Provides a description of a route.

<a name="module_wsdot-route-utils.RouteDescription+sr"></a>

#### routeDescription.sr : <code>string</code>
Mainline component of route ID.

**Kind**: instance property of <code>[RouteDescription](#module_wsdot-route-utils.RouteDescription)</code>  
<a name="module_wsdot-route-utils.RouteDescription+rrt"></a>

#### routeDescription.rrt : <code>string</code>
Related Route Type (RRT) component.

**Kind**: instance property of <code>[RouteDescription](#module_wsdot-route-utils.RouteDescription)</code>  
<a name="module_wsdot-route-utils.RouteDescription+rrq"></a>

#### routeDescription.rrq : <code>string</code>
Related Route Qualifier (RRQ).

**Kind**: instance property of <code>[RouteDescription](#module_wsdot-route-utils.RouteDescription)</code>  
<a name="module_wsdot-route-utils.RouteDescription+isDecrease"></a>

#### routeDescription.isDecrease : <code>boolean</code>
Indicates decreasing direction was specified.If the "canIncludeDirection" option was set to falsein the constructor, this value will be null.

**Kind**: instance property of <code>[RouteDescription](#module_wsdot-route-utils.RouteDescription)</code>  
<a name="module_wsdot-route-utils.RouteDescription+rrtDescription"></a>

#### routeDescription.rrtDescription : <code>string</code>
More detailed description of the RRT.

**Kind**: instance property of <code>[RouteDescription](#module_wsdot-route-utils.RouteDescription)</code>  
<a name="module_wsdot-route-utils.RouteDescription+mainlineConnectionMP"></a>

#### routeDescription.mainlineConnectionMP : <code>number</code>
If applicable, milepost where this route either leaves or joins the mainline.Value will be null when not applicable.

**Kind**: instance property of <code>[RouteDescription](#module_wsdot-route-utils.RouteDescription)</code>  
<a name="module_wsdot-route-utils.RouteDescription+isLocalColector"></a>

#### routeDescription.isLocalColector ⇒ <code>boolean</code>
Indicates if the route is a "local collector" type.

**Kind**: instance property of <code>[RouteDescription](#module_wsdot-route-utils.RouteDescription)</code>  
<a name="module_wsdot-route-utils.RouteDescription+isRamp"></a>

#### routeDescription.isRamp ⇒ <code>boolean</code>
Indicates if the route is a ramp.

**Kind**: instance property of <code>[RouteDescription](#module_wsdot-route-utils.RouteDescription)</code>  
<a name="module_wsdot-route-utils.RouteDescription+rrqDescription"></a>

#### routeDescription.rrqDescription : <code>string</code>
Detailed description of the RRQ.

**Kind**: instance property of <code>[RouteDescription](#module_wsdot-route-utils.RouteDescription)</code>  
<a name="module_wsdot-route-utils.RouteDescription+toString"></a>

#### routeDescription.toString() ⇒ <code>string</code>
Returns the route as a string.

**Kind**: instance method of <code>[RouteDescription](#module_wsdot-route-utils.RouteDescription)</code>  
<a name="module_wsdot-route-utils.RouteDescription.RouteDescription"></a>

#### RouteDescription.RouteDescription
**Kind**: static class of <code>[RouteDescription](#module_wsdot-route-utils.RouteDescription)</code>  
<a name="new_module_wsdot-route-utils.RouteDescription.RouteDescription_new"></a>

##### new RouteDescription(routeId, canIncludeDirection)
Creates new instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| routeId | <code>string</code> |  | route ID |
| canIncludeDirection | <code>boolean</code> | <code>false</code> | Indicates if "d" suffix is allowed in ID to show direction. |

<a name="module_wsdot-route-utils.srRegex"></a>

### wsdot-route-utils.srRegex : <code>Regexp</code>
Matches state route format, with captures for SR, RRT, and RRQ. First element in array will be entire match.

**Kind**: static constant of <code>[wsdot-route-utils](#module_wsdot-route-utils)</code>  
<a name="module_wsdot-route-utils.srdRegex"></a>

### wsdot-route-utils.srdRegex : <code>Regexp</code>
Matches state route + optional direction format, with captures for SR, RRT, RRQ, and direction. First element in array will be entire match.

**Kind**: static constant of <code>[wsdot-route-utils](#module_wsdot-route-utils)</code>  
<a name="module_wsdot-route-utils.relaxedRegex"></a>

### wsdot-route-utils.relaxedRegex : <code>Regexp</code>
A more relaxed Regexp than srRegex, which doesn't check for specific RRTs, only that they are two characters long if present.

**Kind**: static constant of <code>[wsdot-route-utils](#module_wsdot-route-utils)</code>  
<a name="module_wsdot-route-utils.relaxedWithDirRegexp"></a>

### wsdot-route-utils.relaxedWithDirRegexp : <code>Regexp</code>
Like [relaxedRegex](relaxedRegex), but allows optional "d" suffix.

**Kind**: static constant of <code>[wsdot-route-utils](#module_wsdot-route-utils)</code>  
**See**: [relaxedRegex](relaxedRegex)  
<a name="module_wsdot-route-utils.getRouteParts"></a>

### wsdot-route-utils.getRouteParts(routeId, [throwErrorOnMatchFail]) ⇒ <code>Array.&lt;string&gt;</code>
Splits a state route identifer into its component SR, RRT, and RRQ parts.If the input route ID is not in the expected format, one of two thingswill happen according to the value of the "throwErrorOnMatchFail" parameter.If set to false, null will be returned. If set to true, an Error will be thrown.

**Kind**: static method of <code>[wsdot-route-utils](#module_wsdot-route-utils)</code>  
**Returns**: <code>Array.&lt;string&gt;</code> - An array of three elements: SR, RRT, and RRQ.The elements at position 1 and 2 may be null if a route has no RRT or RRQ(as would be the case with a mainline).Will be null if the routeId is not in the expected format and if throwErrorOnMatchFail is false.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| routeId | <code>string</code> |  | A state route identifier. |
| [throwErrorOnMatchFail] | <code>boolean</code> | <code>false</code> | Determines if route IDs that are not in the expected format will fail or simply return null. |

