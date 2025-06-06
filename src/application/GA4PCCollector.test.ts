import { describe, it, expect } from "vitest";
import { Effect, pipe } from "effect";

import { GA4PVCollector } from "./GA4PVCollector.js";
import { MockPVQuery } from "./query/PVQuery.mock.js";
import { MockSlackCommand } from "./command/SlackCommand.mock.js";

describe("GA4PVCollector", () => {
  it("collectAndNotify", async () => {
    const mockPv = new MockPVQuery(42);
    const mockSlack = new MockSlackCommand();
    const collector = new GA4PVCollector(mockPv, mockSlack);

    await pipe(
      collector.collectAndNotifyPV(["A", "B", "C"]),
      Effect.runPromise,
    );

    expect(mockSlack.messages.length).toBe(1);
  });
});
