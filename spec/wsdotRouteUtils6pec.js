/* eslint-env jasmine */

'use strict'

let wsdotRouteUtils = require('../wsdot-route-utils')
let RouteDescription = wsdotRouteUtils.RouteDescription
let getRouteParts = wsdotRouteUtils.getRouteParts

describe('RouteDescription', () => {
  it("won't parse invalidly formatted routes", () => {
    expect(() => {
      const srid = '005AAA'
      let thing = new RouteDescription(srid) // eslint-disable-line no-unused-vars
    }).toThrowError()
  })
  it('can parse mainline routes', () => {
    const srid = '005'
    let desc = new RouteDescription(srid)
    expect(desc.sr).toEqual(srid)
    expect(desc.rrt).toBeNull()
    expect(desc.rrq).toBeNull()
    expect(desc.mainlineConnectionMP).toBeNull()
    expect(desc.rrqDescription).toBeNull()
    expect(desc.rrqDescription).toBeNull()
    expect(desc.toString()).toEqual(srid)
  })
  it('can parse route with RRT && RRQ', () => {
    const srid = '101COABERDN'
    let [sr, rrt, rrq] = getRouteParts(srid)
    let desc = new RouteDescription(srid)
    expect(desc.sr).toEqual(sr)
    expect(desc.rrt).toEqual(rrt)
    expect(desc.rrq).toEqual(rrq)
    expect(desc.rrtDescription).toEqual('Couplet')
    expect(desc.rrqDescription).toEqual('Aberdeen')
    expect(desc.mainlineConnectionMP).toBeNull()
  })
  it('can parse MP from ramp ID', () => {
    const srid = '005R109958'
    let desc = new RouteDescription(srid)
    expect(desc.mainlineConnectionMP).toEqual(99.58)
  })

  it('can optionally support direction', function () {
    const withDirId = '529SPEVERETd'
    const nonDirId = '005Q516479'

    let withDirDesc = new RouteDescription(withDirId, true)
    let nonDirDesc = new RouteDescription(nonDirId, false)
    let incDesc = new RouteDescription(nonDirId, true)
    expect(withDirDesc.isDecrease).toEqual(true)
    expect(nonDirDesc.isDecrease).toEqual(null)
    expect(incDesc.isDecrease).toEqual(false)
    expect(() => {
      let desc = new RouteDescription(withDirId, false) // eslint-disable-line no-unused-vars
    }).toThrowError()
  })
})

