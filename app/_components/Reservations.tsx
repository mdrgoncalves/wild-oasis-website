import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

import type { CabinType } from "../types/data-service";

type ReservationsProps = {
  cabin: CabinType;
};

async function Reservations({ cabin }: ReservationsProps) {
  const [settings, bookedDates] = await Promise.all([
    await getSettings(),
    await getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />

      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservations;
