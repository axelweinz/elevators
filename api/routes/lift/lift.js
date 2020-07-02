const express = require("express");
const router = express.Router();
const simLiftMove = require("../../utils/simLiftMove/simLiftMove");
const calcLift = require("../../utils/calcLift/calcLift");

router.get("/", function(req, res, next) {
    res.send({globalLifts, globalQueue}).status(200);
});

router.put("/", function(req, res, next) {
    try {
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
            if (globalQueue.length > 0) {
                globalQueue.splice(0, 1);
            }
            simLiftMove(closestLift, floorCalled);
        } else if (!available && !globalQueue.includes(floorCalled)) {
            globalQueue.push(floorCalled);
        } else if (available && globalQueue.length > 0) {
            globalQueue.splice(0, 1);
        }
        
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

module.exports = router;