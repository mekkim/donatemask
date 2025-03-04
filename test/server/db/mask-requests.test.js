const { connectToServer, close } = require("../../../server/db/conn");
const maskRequests = require("../../../server/db/mask-requests");

describe("db/mask-requests.js", () => {
  beforeAll(() => connectToServer());
  afterAll(() => close());

  test("get() returns an array of mask requests", () =>
    maskRequests
      .get()
      .then((result) => expect(Array.isArray(result)).toBe(true)));

  test("add() adds a mask request", async () => {
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
      requestFulfilled: true,
      timestamp: new Date(),
    };

    await maskRequests.add(maskRequest);

    const result = await maskRequests.get();
    const { maskAmntRegular, maskAmntSmall,maskAmntLarge, msg, requestFulfilled, testAmnt, timestamp } = maskRequest;
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({
        maskAmntRegular, maskAmntSmall,maskAmntLarge, msg, requestFulfilled, testAmnt, timestamp
      })])
    );
  });

  test("messages() gets recent messages", async () => {
    const maskRequest = {
      priority: "normal",
      requestorType: "individual",
      organizationName: null,
      organizationType: null,
      name: "z67g",
      address: "Address",
      maskAmntRegular: 1,
      maskAmntSmall: 1,
      maskAmntLarge: 1,
      testAmnt: 1,
      postal: "M5W 1E6",
      province: "Ontario",
      email: "z67g@example.com",
      msg: "z67g Message",
      requestFulfilled: false,
      timestamp: new Date(),
    };

    await maskRequests.add(maskRequest);

    const result = await maskRequests.messages();
    const { msg, timestamp } = maskRequest;
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({
        msg, timestamp
      })])
    );
  });
});
