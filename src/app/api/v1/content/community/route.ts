import { NextResponse } from "next/server";
import { communityContent } from "@/data/community";

export async function GET() {
  return NextResponse.json(communityContent);
}
