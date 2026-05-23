import { NextResponse } from "next/server";
import type { ApiResponse, HealthCheckResponse } from "@/types/api";
import { TOKEN_VERSION } from "@/theme/tokens";

export async function GET() {
  const body: ApiResponse<HealthCheckResponse> = {
    data: {
      status: "ok",
      version: TOKEN_VERSION,
    },
    meta: {
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    },
    errors: [],
  };

  return NextResponse.json(body, {
    status: 200,
    headers: {
      "X-Design-Token-Version": TOKEN_VERSION,
    },
  });
}
