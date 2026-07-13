import { NextRequest, NextResponse } from "next/server";
import { fetchRestaurants } from "@/services/restaurantApi";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const { fetchRestaurantById } = await import("@/services/restaurantApi");
      const restaurant = await fetchRestaurantById(id);
      if (!restaurant) {
        return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
      }
      return NextResponse.json(restaurant);
    }

    const destinationId = searchParams.get("destinationId") || searchParams.get("destId") || undefined;
    const cuisine = searchParams.get("cuisine") || undefined;
    const minRatingStr = searchParams.get("minRating");
    const minRating = minRatingStr ? parseFloat(minRatingStr) : undefined;
    const maxPriceLevelStr = searchParams.get("maxPriceLevel");
    const maxPriceLevel = maxPriceLevelStr ? parseInt(maxPriceLevelStr, 10) : undefined;
    const sort = searchParams.get("sort") || undefined;

    const results = await fetchRestaurants({
      destinationId,
      cuisine,
      minRating,
      maxPriceLevel,
      sort,
    });

    return NextResponse.json(results);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
