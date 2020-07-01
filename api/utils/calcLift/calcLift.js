const calcLift = (lift, floorCalled) => {
    let eligible = true;
    let distance = Math.abs(globalLifts[lift].pos - floorCalled);

    let dir = 0;
    if (globalLifts[lift].pos < floorCalled) {
        dir = 1;
    } else if (globalLifts[lift].pos > floorCalled) {
        dir = -1;
    }
    if (globalLifts[lift].dir !== 0) {
        if (globalLifts[lift].dir !== dir) {
            eligible = false;
        } else if (Math.abs(globalLifts[lift].pos - globalLifts[lift].goal) < distance) {
            eligible = false;
        }
    }

    return {eligible, distance};
}

module.exports = calcLift;