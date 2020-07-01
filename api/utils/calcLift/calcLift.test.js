const calcLift = require("./calcLift");

global.globalLifts = [{pos: 0, dir: 0, goal: 0}, {pos: 5, dir: -1, goal: 0}, {pos: 0, dir: 1, goal: 5}];

test('calc eligible lift', () => {
    const {eligible, distance} = calcLift(0, 5);
    expect(eligible).toBe(true);
    expect(distance).toBe(5);
});

test('calc eligible moving lift', () => {
    const {eligible, distance} = calcLift(2, 4);
    expect(eligible).toBe(true);
    expect(distance).toBe(4);
});

test('calc non eligible lift', () => {
    const {eligible, distance} = calcLift(1, 6);
    expect(eligible).toBe(false);
    expect(distance).toBe(1);
});