wsdot-route-utils
=================

Utilities for working with Washington state route identifiers.

[![Build Status](https://travis-ci.org/WSDOT-GIS/wsdot-route-utils.svg?branch=master)](https://travis-ci.org/WSDOT-GIS/wsdot-route-utils)

[![npm](https://img.shields.io/npm/l/wsdot-route-utils.svg?maxAge=2592000)](http://unlicense.org)
[![npm](https://img.shields.io/npm/v/wsdot-route-utils.svg?maxAge=2592000)](https://www.npmjs.com/package/wsdot-route-utils)
[![npm](https://img.shields.io/npm/dm/wsdot-route-utils.svg?maxAge=2592000)](https://www.npmjs.com/package/wsdot-route-utils)
[![node](https://img.shields.io/node/v/wsdot-route-utils.svg?maxAge=2592000)](https://www.npmjs.com/package/wsdot-route-utils)

Get from NPM
------------

```sh
npm install --save wsdot-route-utils
```

Sample
------

### Load module ###

#### JavaScript ####

##### ES5 #####
```javascript
let wsdotRouteUtils = require('wsdot-route-utils')
let RouteDescription = wsdotRouteUtils.RouteDescription
```

##### ES2015 #####
```javascript
import { RouteDescription } from 'wsdot-route-utils'
```

### Get info about a route ID ###

```javascript
const srid = '101COABERDN'
let desc = new RouteDescription(srid)
console.log(desc.sr) // '101'
console.log(desc.rrt) // 'CO'
console.log(desc.rrq) // 'ABERDN'
console.log(desc.rrtDescription) // 'Couplet'
console.log(desc.rrqDescription) // 'Aberdeen' (description may sometimes be just the same as `rrq`).
console.log(desc.mainlineConnectionMP) // null
console.log(desc.shield) // 'US'
```

```javascript
const srid = '005R109958'
let desc = new RouteDescription(srid)
console.log(desc.sr) // '005'
console.log(desc.rrt) // 'R1'
console.log(desc.rrq) // '09958'
console.log(desc.rrtDescription) // 'Off Ramp, Dec'
console.log(desc.rrqDescription) // 'at milepost 99.58'
console.log(desc.mainlineConnectionMP) // 99.58
console.log(desc.shield) // 'IS'
```