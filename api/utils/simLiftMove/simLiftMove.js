const simLiftMove = async (lift, floorCalled) => {
    let dir = 0;
    globalLifts[lift].goal = floorCalled;
    const steps = Math.abs(globalLifts[lift].pos - floorCalled);
    
    if (globalLifts[lift].pos < floorCalled) {
        dir = 1;
    } else if (globalLifts[lift].pos > floorCalled) {
        dir = -1;
    }
    globalLifts[lift].dir = dir;

    for (let i=0; i<steps; i++) {
        await new Promise(r => setTimeout(r, 2000));
        if (dir === 1) {
            globalLifts[lift].pos += 1;    
        } else if (dir === -1) {
            globalLifts[lift].pos -= 1;
        }
    }
    globalLifts[lift].dir = 0;
}

module.exports = simLiftMove;