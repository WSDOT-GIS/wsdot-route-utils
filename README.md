# wsdot-route-utils

Utilities for working with Washington state route identifiers.

[![Node.js CI](https://github.com/WSDOT-GIS/wsdot-route-utils/actions/workflows/node.js.yml/badge.svg)](https://github.com/WSDOT-GIS/wsdot-route-utils/actions/workflows/node.js.yml)
[![Unlicense badge](https://img.shields.io/npm/l/wsdot-route-utils.svg?maxAge=2592000)](http://unlicense.org)
[![npm version number](https://img.shields.io/npm/v/wsdot-route-utils.svg?maxAge=2592000)](https://www.npmjs.com/package/wsdot-route-utils)
[![npm download count](https://img.shields.io/npm/dm/wsdot-route-utils.svg?maxAge=2592000)](https://www.npmjs.com/package/wsdot-route-utils)
[![node version](https://img.shields.io/node/v/wsdot-route-utils.svg?maxAge=2592000)](https://www.npmjs.com/package/wsdot-route-utils)

## NPM Installation

Use the following command to install the module into your npm project.

```bash
npm install --save wsdot-route-utils
```

## Sample

### Load module

#### JavaScript

```javascript
import { RouteDescription } from "wsdot-route-utils";
```

### Get info about a route ID

```javascript
const srid = "101COABERDN";
const desc = new RouteDescription(srid);
console.log(desc.sr); // '101'
console.log(desc.rrt); // 'CO'
console.log(desc.rrq); // 'ABERDN'
console.log(desc.rrtDescription); // 'Couplet'
console.log(desc.rrqDescription); // 'Aberdeen' (description may sometimes be just the same as `rrq`).
console.log(desc.mainlineConnectionMP); // null
console.log(desc.shield); // 'US'
```

```javascript
const srid = "005R109958";
const desc = new RouteDescription(srid);
console.log(desc.sr); // '005'
console.log(desc.rrt); // 'R1'
console.log(desc.rrq); // '09958'
console.log(desc.rrtDescription); // 'Off Ramp, Dec'
console.log(desc.rrqDescription); // 'at milepost 99.58'
console.log(desc.mainlineConnectionMP); // 99.58
console.log(desc.shield); // 'IS'
```
