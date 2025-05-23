"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const currentFilter = searchParams.get("capacity") ?? "all";

  return (
    <div className="border border-primary-800 flex">
      <Button
        filterKey="all"
        handleFilter={handleFilter}
        activeFilter={currentFilter}
      >
        All Cabins
      </Button>

      <Button
        filterKey="small"
        handleFilter={handleFilter}
        activeFilter={currentFilter}
      >
        Small (1-3)
      </Button>

      <Button
        filterKey="medium"
        handleFilter={handleFilter}
        activeFilter={currentFilter}
      >
        Medium (4-7)
      </Button>

      <Button
        filterKey="large"
        handleFilter={handleFilter}
        activeFilter={currentFilter}
      >
        Large (8+)
      </Button>
    </div>
  );
}

type FilterProps = {
  filterKey: string;
  handleFilter: (filter: string) => void;
  activeFilter: string;
  children: React.ReactNode;
};

function Button({
  filterKey,
  handleFilter,
  activeFilter,
  children,
}: FilterProps) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filterKey === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filterKey)}
    >
      {children}
    </button>
  );
}

export default Filter;
