import { NextResponse } from "next/server";
import { homeContent } from "@/data/home";

export async function GET() {
  return NextResponse.json(homeContent);
}
