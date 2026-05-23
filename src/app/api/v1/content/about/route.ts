import { NextResponse } from "next/server";
import { aboutContent } from "@/data/about";

export async function GET() {
  return NextResponse.json(aboutContent);
}
