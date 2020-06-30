const express = require("express");
const router = express.Router();
const simLiftMove = require("../utils/simLiftMove");
const calcLift = require("../utils/calcLift");

router.get("/", function(req, res, next) {
    res.send(globalLifts).status(200);
});

router.put("/", async function(req, res, next) {
    const floorCalled = req.body.floorCalled;
    let closestLift = 0;
    let closestDistance = 1000;
    for (lift in globalLifts) {
        const { eligible, distance } = calcLift(lift, floorCalled);
        if (eligible && distance < closestDistance) {
            closestLift = lift;
            closestDistance = distance;
        }
    }
    
    if (globalLifts[closestLift].dir === 0) {
        await simLiftMove(closestLift, floorCalled);
    }
    res.status(200);
});

module.exports = router;