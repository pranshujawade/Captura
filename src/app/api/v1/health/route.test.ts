import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/v1/health/route";

describe("Health API endpoint", () => {
  it("returns a 200 response with ok status", async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.data.status).toBe("ok");
    expect(body.data.version).toBeDefined();
    expect(body.meta.version).toBe("1.0.0");
    expect(body.errors).toEqual([]);
  });

  it("includes X-Design-Token-Version header", async () => {
    const response = await GET();
    const tokenVersion = response.headers.get("X-Design-Token-Version");
    expect(tokenVersion).toBe("1.0.0");
  });
});
