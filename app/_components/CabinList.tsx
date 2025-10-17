import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";

import CabinCard from "./CabinCard";

import type { CabinsType } from "../types/data-service";

type CabinListProps = {
  filter: string;
};

async function CabinList({ filter }: CabinListProps) {
  // This is a workaround to prevent caching of the data
  noStore();

  const cabins: CabinsType = await getCabins();

  if (!cabins.length) return null;

  // Filter cabins based on the filter prop
  let displayedCabins = cabins;

  if (filter !== "all") {
    displayedCabins = cabins;
  }

  if (filter === "small") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }

  if (filter === "medium") {
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 4 && cabin.maxCapacity <= 7
    );
  }

  if (filter === "large") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 6);
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
