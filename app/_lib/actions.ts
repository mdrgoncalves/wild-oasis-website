"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  const nationalID = formData.get("nationalID");

  const [nationality, countryFlag] = formData
    .get("nationality")!
    .toString()
    .split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID!.toString())) {
    throw new Error("Invalid National ID number");
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user?.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  const guestBookings = await getBookings(session.user?.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("Booking does not belong to the current user");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  const bookingId = Number(formData.get("bookingId"));

  const guestBookings = await getBookings(session.user?.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("Booking does not belong to the current user");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations")?.slice(0, 1000);

  const updateData = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
