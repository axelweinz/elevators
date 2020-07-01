const express = require("express");
const router = express.Router();
const simLiftMove = require("../utils/simLiftMove");
const calcLift = require("../utils/calcLift");

router.get("/", function(req, res, next) {
    res.send({globalLifts, globalQueue}).status(200);
});

router.put("/", function(req, res, next) {
    const floorCalled = req.body.floorCalled;

    let closestLift = 0;
    let closestDistance = 1000;
    let available = false;
    for (lift in globalLifts) {
        const { eligible, distance } = calcLift(lift, floorCalled);
        if (eligible && distance < closestDistance) {
            closestLift = lift;
            closestDistance = distance;
            available = true;
        }
    }
    
    if (globalLifts[closestLift].dir === 0) {
        for (let i = globalQueue.length-1; i >= 0; i--) {
            const { eligible } = calcLift(closestLift, globalQueue[i]);
            if (eligible) {
                globalQueue.splice(i, 1);
            }
        }
        simLiftMove(closestLift, floorCalled);
    } else if (!available && !globalQueue.includes(floorCalled)) {
        globalQueue.push(floorCalled);
    }
    
    res.sendStatus(200);
});

module.exports = router;