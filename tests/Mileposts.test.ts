import { FormatError, Milepost } from "../src";

describe("Mileposts", () => {
  test("Milepost constructor parsing, etc.", () => {
    let mp = new Milepost(5, true);
    expect(mp.isBack).toStrictEqual(true);
    expect(mp.mp).toStrictEqual(5);
    let inputString: `${number}${"A" | "B"}` = "5A";
    mp = new Milepost(inputString);
    expect(mp.isBack).toStrictEqual(false);
    expect(mp.mp).toStrictEqual(5);
    expect(mp.toString(true)).toEqual(inputString);
    expect(mp.toString()).toEqual("5");
    inputString = "5B";
    mp = new Milepost(inputString);
    expect(mp.isBack).toStrictEqual(true);
    expect(mp.mpAsChar).toStrictEqual(mp.backAsChar);
    expect(mp.mp).toStrictEqual(5);
    expect(mp.toString()).toEqual(inputString);
  });
  test(`bad input should generate ${FormatError.name}s`, () => {
    const badInput = "afhawiufhawiufewoiwfejoi"; // spell:disable-line;
    expect(() => {
      // @ts-expect-error Intentionally checking to see what happens with bad input
      new Milepost(badInput);
    }).toThrow(FormatError);
    expect(() => {
      // @ts-expect-error Intentionally checking to see what happens with bad input
      Milepost.parseFromRoadsAndHighways(badInput);
    }).toThrow(FormatError);
  });
});
