const request = require("supertest");

const { connectToServer, close } = require("../../../server/db/conn");
const app = require("../../../server/api");
const donations = require("../../../server/db/donations");
const maskRequests = require("../../../server/db/mask-requests");
const demographics = require("../../../server/db/demographics");

describe("dbapi", () => {
  beforeAll(() => connectToServer());
  afterAll(() => close());

  describe("/api/messages", () => {
    test("GET /api/messages should send correct cache-control header", () =>
      request(app)
        .get("/api/messages")
        .expect(
          "Cache-Control",
          "max-age=600, stale-while-revalidate=60, stale-if-error=86400"
        )
        .expect(200));

    test("GET /api/messages should include the expected properties", () =>
      request(app)
        .get("/api/messages")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        }));

    test("Specifying a ?count should limit the number of messages returned", async () => {
      // Add a donation
      await request(app)
        .post("/api/donation_add")
        .send({
          name: "j8Y5",
          email: "j8Y5@example.com",
          maskAmnt: 1,
          totalDonation: 1 * 1.25,
          msg: "j8Y5 Donation Message",
          timestamp: new Date(),
        })
        .expect(201);

      // Add a mask request
      await request(app)
        .post("/api/mask_request_add")
        .send({
          priority: "normal",
          requestorType: "individual",
          organizationName: null,
          organizationType: null,
          name: "k3yG",
          address: "Address",
          maskAmntRegular: 3,
          maskAmntSmall: 3,
          maskAmntLarge: 3,
          testAmnt: 9,
          postal: "M5W 1E6",
          province: "Ontario",
          email: "k3yG@example.com",
          msg: "k3yG Message",
          requestFulfilled: false,
          timestamp: new Date(),
        })
        .expect(201);

      return request(app)
        .get("/api/messages?count=1")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBe(1);
        });
    });

    test("Messages should include most recent mask request", async () => {
      const maskRequest = {
        priority: "normal",
        requestorType: "individual",
        organizationName: null,
        organizationType: null,
        name: "n6yG",
        address: "Address",
        maskAmntRegular: 3,
        maskAmntSmall: 3,
        maskAmntLarge: 3,
        testAmnt: 9,
        postal: "M5W 1E6",
        province: "Ontario",
        email: "n6yG@example.com",
        msg: "n6yG Message",
        requestFulfilled: false,
        timestamp: new Date(),
      };

      // Add a Mask Request
      await request(app)
        .post("/api/mask_request_add")
        .send(maskRequest)
        .expect(201);

      return request(app)
        .get("/api/messages")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                msg: maskRequest.msg,
                timestamp: maskRequest.timestamp.toISOString(),
              }),
            ])
          );
        });
    });
  });

  describe("/api/stats", () => {
    test("GET /api/stats should send correct cache-control header", () =>
      request(app)
        .get("/api/stats")
        .expect(
          "Cache-Control",
          "max-age=600, stale-while-revalidate=60, stale-if-error=86400"
        )
        .expect(200));

    const ensureTotalUnfundedMasks = (unfunded, requested, donated) => {
      if (requested > donated) {
        expect(unfunded).toEqual(requested - donated);
      } else {
        expect(unfunded).toEqual(0);
      }
    };

    test("GET /api/stats should include the expected properties", () =>
      request(app)
        .get("/api/stats")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(typeof res.body.masksDonated).toBe("number");
          expect(typeof res.body.masksRequested).toBe("number");
          expect(typeof res.body.masksFulfilled).toBe("number");
          expect(typeof res.body.testsRequested).toBe("number");
          expect(typeof res.body.testsFulfilled).toBe("number");
          expect(typeof res.body.unfundedMasks).toBe("number");
        }));

    test("Adding a donation should update stats", async () => {
      // 1. Get the original stats
      const { body: original } = await request(app)
        .get("/api/stats")
        .expect("Content-Type", /json/)
        .expect(200);

      // 2. Add a donation
      await request(app)
        .post("/api/donation_add")
        .send({
          name: "h8b6",
          email: "h8b6@example.com",
          maskAmnt: 1,
          totalDonation: 1 * 1.25,
          msg: "h8b6 Donation Message",
          timestamp: new Date(),
        })
        .expect(201);

      // 3. Make sure the stats reflect the donation
      const { body: updated } = await request(app)
        .get("/api/stats")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(updated.masksDonated).toEqual(original.masksDonated + 1);
      expect(updated.masksRequested).toEqual(original.masksRequested);
      expect(updated.masksFulfilled).toEqual(original.masksFulfilled);
      expect(updated.testsRequested).toEqual(original.testsRequested);
      expect(updated.testsFulfilled).toEqual(original.testsFulfilled);
      ensureTotalUnfundedMasks(
        updated.unfundedMasks,
        updated.masksRequested,
        updated.masksDonated
      );
    });

    test("Adding an unfulfilled mask request should update stats", async () => {
      // 1. Get the original stats
      const { body: original } = await request(app)
        .get("/api/stats")
        .expect("Content-Type", /json/)
        .expect(200);

      // 2. Add a mask request
      await request(app)
        .post("/api/mask_request_add")
        .send({
          priority: "normal",
          requestorType: "individual",
          organizationName: null,
          organizationType: null,
          name: "Name",
          address: "Address",
          maskAmntRegular: 3,
          maskAmntSmall: 3,
          maskAmntLarge: 3,
          testAmnt: 9,
          postal: "M5W 1E6",
          province: "Ontario",
          email: "email@example.com",
          msg: "Message",
          requestFulfilled: false,
          timestamp: new Date(),
        })
        .expect(201);

      // 3. Make sure the stats reflect the mask request
      const { body: updated } = await request(app)
        .get("/api/stats")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(updated.masksDonated).toEqual(original.masksDonated);
      expect(updated.masksRequested).toEqual(original.masksRequested + 9);
      expect(updated.masksFulfilled).toEqual(original.masksFulfilled);
      expect(updated.testsRequested).toEqual(original.testsRequested + 9);
      expect(updated.testsFulfilled).toEqual(original.testsFulfilled);
      ensureTotalUnfundedMasks(
        updated.unfundedMasks,
        updated.masksRequested,
        updated.masksDonated
      );
    });

    test("Adding a fulfilled mask request should update stats", async () => {
      // 1. Get the original stats
      const { body: original } = await request(app)
        .get("/api/stats")
        .expect("Content-Type", /json/)
        .expect(200);

      // 2. Add a mask request
      await request(app)
        .post("/api/mask_request_add")
        .send({
          priority: "normal",
          requestorType: "individual",
          organizationName: null,
          organizationType: null,
          name: "Name",
          address: "Address",
          maskAmntRegular: 4,
          maskAmntSmall: 4,
          maskAmntLarge: 4,
          testAmnt: 12,
          postal: "M5W 1E6",
          province: "Ontario",
          email: "email@example.com",
          msg: "Message",
          requestFulfilled: true,
          timestamp: new Date(),
        })
        .expect(201);

      // 3. Make sure the stats reflect the mask request
      const { body: updated } = await request(app)
        .get("/api/stats")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(updated.masksDonated).toEqual(original.masksDonated);
      expect(updated.masksRequested).toEqual(original.masksRequested + 12);
      expect(updated.masksFulfilled).toEqual(original.masksFulfilled);
      expect(updated.testsRequested).toEqual(original.testsRequested + 12);
      expect(updated.testsFulfilled).toEqual(original.testsFulfilled);
      ensureTotalUnfundedMasks(
        updated.unfundedMasks,
        updated.masksRequested,
        updated.masksDonated
      );
    });
  });

  describe("donations", () => {
    test("POST /api/donation_add should add a donation and return 201", () => {
      const donation = {
        name: "nDuX",
        email: "nDuX@example.com",
        maskAmnt: 10,
        msg: "nDuX Donation Message",
        timestamp: new Date(),
      };

      return request(app).post("/api/donation_add").send(donation).expect(201);
    });

    test("A donation added should exist in returned results", async () => {
      const donation = {
        name: "6EjR",
        email: "6EjR@example.com",
        maskAmnt: 3,
        msg: "6EjR Donation Message",
        timestamp: new Date(),
      };

      // Create a new donation in the db
      await request(app).post("/api/donation_add").send(donation).expect(201);
      // Make sure we can get it back again
      const results = await donations.get();
      const { maskAmnt, msg, timestamp } = donation;
      expect(results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            maskAmnt,
            msg,
            timestamp: timestamp.toISOString(),
          }),
        ])
      );
    });
  });

  describe("masks", () => {
    test("POST /api/mask_request_add should add a mask request and return 201", () => {
      const maskRequest = {
        priority: "normal",
        requestorType: "individual",
        organizationName: null,
        organizationType: null,
        name: "Name",
        address: "Address",
        maskAmntRegular: 1,
        maskAmntSmall: 1,
        maskAmntLarge: 1,
        testAmnt: 1,
        postal: "M5W 1E6",
        province: "Ontario",
        email: "email@example.com",
        msg: "Message",
        requestFulfilled: false,
        timestamp: new Date(),
        // No demographics data included, by design
      };

      return request(app)
        .post("/api/mask_request_add")
        .send(maskRequest)
        .expect(201);
    });

    test("A mask request added should exist in returned results", async () => {
      const maskRequest = {
        priority: "normal",
        requestorType: "organization",
        organizationName: "Organization Name",
        organizationType: "Organization Type",
        name: "New Name",
        address: "New Address",
        maskAmntRegular: 2,
        maskAmntSmall: 2,
        maskAmntLarge: 2,
        testAmnt: 2,
        postalCode: "M5W 1E7",
        province: "Manitoba",
        email: "email2@example.com",
        msg: "New Message",
        timestamp: new Date(),
      };

      // Create a new mask request in the db
      await request(app)
        .post("/api/mask_request_add")
        .send({
          ...maskRequest,
          // The route expects .postal to be sent, but db uses .postalCode
          postal: maskRequest.postalCode,
        })
        .expect(201);

      // Make sure we can get it back again
      const results = await maskRequests.get();
      const { maskAmntRegular, maskAmntSmall,maskAmntLarge, testAmnt, msg, timestamp } =
        maskRequest;
      expect(results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            maskAmntRegular,
            maskAmntSmall,
            maskAmntLarge,
            testAmnt,
            msg,
            // The timestamp will be an ISO string vs. Date Object
            timestamp: timestamp.toISOString(),
          }),
        ])
      );
    });
  });

  test("A mask request should add default demographic data", async () => {
    const maskRequest = {
      priority: "normal",
      requestorType: "organization",
      organizationName: "Organization Name",
      organizationType: "Organization Type",
      name: "New Name",
      address: "New Address",
      maskAmntRegular: 2,
      maskAmntSmall: 2,
      maskAmntLarge: 2,
      testAmnt: 2,
      postalCode: "M5W 1E7",
      province: "Manitoba",
      email: "email2@example.com",
      msg: "New Message",
      timestamp: new Date(),
      // No demographics included
    };

    // Create a new mask request in the db
    await request(app)
      .post("/api/mask_request_add")
      .send({
        ...maskRequest,
        // The route expects .postal to be sent, but db uses .postalCode
        postal: maskRequest.postalCode,
      })
      .expect(201);

    // Make sure we get back the default demographics info
    const results = await demographics.get();
    const { timestamp, postalCode } = maskRequest;
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          postalCode,
          groups: ["None Selected"],
          // The timestamp will be an ISO string vs. Date Object
          timestamp: timestamp.toISOString(),
        }),
      ])
    );
  });

  test("A mask request with demographic data should get stored", async () => {
    const maskRequest = {
      priority: "normal",
      requestorType: "organization",
      organizationName: "Organization Name",
      organizationType: "Organization Type",
      name: "New Name",
      address: "New Address",
      maskAmntRegular: 2,
      maskAmntSmall: 2,
      maskAmntLarge: 2,
      testAmnt: 2,
      postalCode: "M5W 1E7",
      province: "Manitoba",
      email: "email2@example.com",
      msg: "New Message",
      timestamp: new Date(),
      // demographics included
      demographics: ["Demographic Group"],
    };

    // Create a new mask request in the db
    await request(app)
      .post("/api/mask_request_add")
      .send({
        ...maskRequest,
        // The route expects .postal to be sent, but db uses .postalCode
        postal: maskRequest.postalCode,
      })
      .expect(201);

    // Make sure we get back the default demographics info
    const results = await demographics.get();
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          postalCode: maskRequest.postalCode,
          groups: maskRequest.demographics,
          // The timestamp will be an ISO string vs. Date Object
          timestamp: maskRequest.timestamp.toISOString(),
        }),
      ])
    );
  });
});
