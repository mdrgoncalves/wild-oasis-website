import { Suspense } from "react";

import Cabin from "@/components/Cabin";
import Reservations from "@/components/Reservations";
import Spinner from "@/components/Spinner";
import { getCabin, getCabins } from "@/lib/data-service";

interface CabinPageProps {
  params: {
    cabinId: string;
  };
}

export async function generateMetadata({ params }: CabinPageProps) {
  const cabin = await getCabin(params.cabinId);

  return {
    title: `Cabin ${cabin.name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

export default async function Page({ params }: CabinPageProps) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve today {cabin.name}. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservations cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
