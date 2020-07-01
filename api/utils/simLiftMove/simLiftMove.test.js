const simLiftMove = require("./simLiftMove");

global.globalLifts = [{pos: 0, dir: 0, goal: 0}];

test('simLiftMove correct time and goal', async () => {
    const start = performance.now();
    await simLiftMove(0, 2);
    const end = performance.now();
    expect(end - start).toBeGreaterThan(4000);
    expect(globalLifts[0]).toEqual({pos: 2, dir: 0, goal: 2});
});