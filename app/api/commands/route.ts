import { NextResponse } from "next/server";
import type { Commands } from "@/types/commands";

export async function GET() {
	try {
		const response = await fetch("https://reveal.warm.lat/bot/commands", {
			next: { revalidate: 120 }, // Revalidate every 120 seconds
		});

		if (!response.ok) {
			throw new Error("Failed to fetch commands");
		}

		const data: Commands = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching commands:", error);
		return NextResponse.json(
			{ error: "Failed to fetch commands" },
			{ status: 500 },
		);
	}
}
