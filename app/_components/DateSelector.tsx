"use client";

import { isWithinInterval } from "date-fns";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { useReservation } from "@/context/ReservationContext";

import type { CabinType } from "@/types/data-service";
import type { Settings } from "@/types/settings";

type DateSelectorProps = {
  settings: Settings;
  cabin: CabinType;
  bookedDates?: any[];
};

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ cabin, settings, bookedDates }: DateSelectorProps) {
  const defaultClassNames = getDefaultClassNames();

  const { range, setRange, resetRange } = useReservation();

  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-8 place-self-center"
        classNames={{
          ...defaultClassNames,
          today: "bg-accent-500 text-primary-800",
          selected: "bg-accent-600 text-primary-800",
          chevron: "fill-amber-500",
          range_start: "bg-accent-600 text-primary-800",
          range_middle: "bg-accent-600 text-primary-800",
          range_end: "bg-accent-600 text-primary-800",
        }}
        onSelect={setRange}
        selected={range}
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        hidden={{ before: new Date() }}
        endMonth={
          new Date(new Date().setFullYear(new Date().getFullYear() + 5))
        }
        captionLayout="dropdown"
        numberOfMonths={1}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
