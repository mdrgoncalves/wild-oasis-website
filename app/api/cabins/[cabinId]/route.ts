export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabins(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({
      cabin,
      bookedDates,
    });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

// export async function POST() {}
