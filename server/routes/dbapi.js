const express = require("express");

const donations = require("../db/donations");
const maskRequests = require("../db/mask-requests");
const demographics = require("../db/demographics");

const router = express.Router();

// Get stats for donations and mask requests.
router.get("/api/stats", async (req, res, next) => {
  try {
    const [donationsStats, maskRequestsStats] = await Promise.all([
      donations.stats(),
      maskRequests.stats(),
    ]);

    // Explicitly add cache-control to prevent Passenger/Apache using a long
    // default. For /api/* we want short-lived cache (10 min), but will tolerate stale
    // content while it's being updated (600=10 min, 60=1 min, 86400=1 day)
    res
      .header(
        "Cache-Control",
        "max-age=600, stale-while-revalidate=60, stale-if-error=86400"
      )
      .json({
        ...donationsStats,
        ...maskRequestsStats,
        unfundedMasks:
          maskRequestsStats.masksRequested > donationsStats.masksDonated
            ? maskRequestsStats.masksRequested - donationsStats.masksDonated
            : 0,
      });
  } catch (err) {
    next(err);
  }
});

// Get messages from donations and mask requests
router.get("/api/messages", async (req, res, next) => {
  const count = parseInt(req.query.count, 10) || 25;
  try {
    // Explicitly add cache-control to prevent Passenger/Apache using a long
    // default. For /api/* we want short-lived cache (10 min), but will tolerate stale
    // content while it's being updated (600=10 min, 60=1 min, 86400=1 day)
    res
      .header(
        "Cache-Control",
        "max-age=600, stale-while-revalidate=60, stale-if-error=86400"
      )
      .json(await maskRequests.messages(count));
  } catch (err) {
    next(err);
  }
});

// Add donation.
router.post("/api/donation_add", async (req, res, next) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    maskAmnt: req.body.maskAmnt,
    msg: req.body.msg,
    timestamp: req.body.timestamp,
  };

  try {
    res.status(201).json(await donations.add(data));
  } catch (err) {
    next(err);
  }
});

// Add mask request and demographic data, keeping the two separate
router.post("/api/mask_request_add", async (req, res, next) => {
  try {
    // Record entries for requests and demographics separately
    await Promise.all([
      maskRequests.add({
        priority: req.body.priority || "normal",
        requestorType: req.body.requestorType,
        organizationName: req.body.organizationName,
        organizationType: req.body.organizationType,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postal,
        maskAmntRegular: req.body.maskAmntRegular,
        maskAmntSmall: req.body.maskAmntSmall,
        maskAmntLarge: req.body.maskAmntLarge,
        testAmnt: req.body.testAmnt,
        msg: req.body.msg,
        requestFulfilled: false,
        timestamp: req.body.timestamp,
      }),
      demographics.add({
        postalCode: req.body.postal,
        groups: req.body.demographics || ["None Selected"],
        purpose: req.body.purpose,
        timestamp: req.body.timestamp,
      }),
    ]);

    res.status(201).send("ok");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
