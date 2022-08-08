import { FormatError, Milepost } from "./index.js";

describe('Mileposts', () => {
    test('Milepost constructor parsing, etc.', () => {
        let mp = new Milepost(5, true);
        expect(mp.isBack).toStrictEqual(true);
        expect(mp.mp).toStrictEqual(5);
        let inputString = "5A"
        mp = new Milepost(inputString);
        expect(mp.isBack).toStrictEqual(false);
        expect(mp.mp).toStrictEqual(5);
        expect(mp.toString(true)).toEqual(inputString);
        expect(mp.toString()).toEqual("5");
        inputString = "5B";
        mp = new Milepost(inputString);
        expect(mp.isBack).toStrictEqual(true);
        expect(mp.mp).toStrictEqual(5);
        expect(mp.toString()).toEqual(inputString);
    });
    test('bad input should generate TypeErrors', () => {
        const badInput = "afhawiufhawiufewoiwfejoi";
        expect(() => {
            new Milepost(badInput)
        }).toThrow(FormatError);
        expect(() => {
            Milepost.parseFromRoadsAndHighways(badInput)
        }).toThrow(FormatError);
    });
});