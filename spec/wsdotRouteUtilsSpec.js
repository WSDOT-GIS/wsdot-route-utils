/* eslint-env jasmine */

'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var wsdotRouteUtils = require('../wsdot-route-utils');
var RouteDescription = wsdotRouteUtils.RouteDescription;
var getRouteParts = wsdotRouteUtils.getRouteParts;

describe('RouteDescription', function () {
  it("won't parse invalidly formatted routes", function () {
    expect(function () {
      var srid = '005AAA';
      var thing = new RouteDescription(srid); // eslint-disable-line no-unused-vars
    }).toThrowError();
  });
  it('can parse mainline routes', function () {
    var srid = '005';
    var desc = new RouteDescription(srid);
    expect(desc.sr).toEqual(srid);
    expect(desc.rrt).toBeNull();
    expect(desc.rrq).toBeNull();
    expect(desc.mainlineConnectionMP).toBeNull();
    expect(desc.rrqDescription).toBeNull();
    expect(desc.rrqDescription).toBeNull();
    expect(desc.toString()).toEqual(srid);
  });
  it('can parse route with RRT && RRQ', function () {
    var srid = '101COABERDN';

    var _getRouteParts = getRouteParts(srid);

    var _getRouteParts2 = _slicedToArray(_getRouteParts, 3);

    var sr = _getRouteParts2[0];
    var rrt = _getRouteParts2[1];
    var rrq = _getRouteParts2[2];

    var desc = new RouteDescription(srid);
    expect(desc.sr).toEqual(sr);
    expect(desc.rrt).toEqual(rrt);
    expect(desc.rrq).toEqual(rrq);
    expect(desc.rrtDescription).toEqual('Couplet');
    expect(desc.rrqDescription).toEqual('Aberdeen');
    expect(desc.mainlineConnectionMP).toBeNull();
  });
  it('can parse MP from ramp ID', function () {
    var srid = '005R109958';
    var desc = new RouteDescription(srid);
    expect(desc.mainlineConnectionMP).toEqual(99.58);
  });

  it('can optionally support direction', function () {
    var withDirId = '529SPEVERETd';
    var nonDirId = '005Q516479';

    var withDirDesc = new RouteDescription(withDirId, true);
    var nonDirDesc = new RouteDescription(nonDirId, false);
    var incDesc = new RouteDescription(nonDirId, true);
    expect(withDirDesc.isDecrease).toEqual(true);
    expect(nonDirDesc.isDecrease).toEqual(null);
    expect(incDesc.isDecrease).toEqual(false);
    expect(function () {
      var desc = new RouteDescription(withDirId, false); // eslint-disable-line no-unused-vars
    }).toThrowError();
  });
});

