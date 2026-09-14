"use client";

import { useMemo, useState } from "react";
import { wheels } from "@/data/wheels";
import WheelGrid from "@/components/wheelGrid";
import FilterBar from "@/components/filterBar";

export type SortOption = "none" | "priceAsc" | "priceDesc";

function toNumber(value: string) {
  return Number(value.replace(/[$,]/g, ""));
}

export default function Home() {
  const [diameters, setDiameters] = useState<number[]>([]);
  const [widths, setWidths] = useState<number[]>([]);
  const [boltPatterns, setBoltPatterns] = useState<string[]>([]);
  const [finishes, setFinishes] = useState<string[]>([]);

  const [minOffset, setMinOffset] = useState<number | null>(null);
  const [maxOffset, setMaxOffset] = useState<number | null>(null);

  const [sort, setSort] = useState<SortOption>("none");

  const availableDiameters = useMemo(() => {
    return [...new Set(wheels.map((wheel) => toNumber(wheel.diameter_in)))]
      .sort((a, b) => a - b);
  }, []);

  const availableWidths = useMemo(() => {
    return [...new Set(wheels.map((wheel) => toNumber(wheel.width_in)))]
      .sort((a, b) => a - b);
  }, []);

  const availableBoltPatterns = useMemo(() => {
    return [...new Set(wheels.map((wheel) => wheel.bolt_pattern))]
      .sort();
  }, []);

  const availableFinishes = useMemo(() => {
    return [...new Set(wheels.map((wheel) => wheel.finish))]
      .sort();
  }, []);

  function toggleDiameter(value: number) {
    setDiameters((current) =>
      current.includes(value)
        ? current.filter((diameter) => diameter !== value)
        : [...current, value]
    );
  }

  function toggleWidth(value: number) {
    setWidths((current) =>
      current.includes(value)
        ? current.filter((width) => width !== value)
        : [...current, value]
    );
  }

  function toggleBoltPattern(value: string) {
    setBoltPatterns((current) =>
      current.includes(value)
        ? current.filter((pattern) => pattern !== value)
        : [...current, value]
    );
  }

  function toggleFinish(value: string) {
    setFinishes((current) =>
      current.includes(value)
        ? current.filter((finish) => finish !== value)
        : [...current, value]
    );
  }

  function clearFilters() {
    setDiameters([]);
    setWidths([]);
    setBoltPatterns([]);
    setFinishes([]);
    setMinOffset(null);
    setMaxOffset(null);
    setSort("none");
  }

  const filteredWheels = useMemo(() => {
    let result = wheels.filter((wheel) => {
      const diameter = toNumber(wheel.diameter_in);
      const width = toNumber(wheel.width_in);
      const offset = toNumber(wheel.offset_mm);

      if (
        diameters.length > 0 &&
        !diameters.includes(diameter)
      ) {
        return false;
      }

      if (
        widths.length > 0 &&
        !widths.includes(width)
      ) {
        return false;
      }

      if (
        boltPatterns.length > 0 &&
        !boltPatterns.includes(wheel.bolt_pattern)
      ) {
        return false;
      }

      if (
        finishes.length > 0 &&
        !finishes.includes(wheel.finish)
      ) {
        return false;
      }

      if (
        minOffset !== null &&
        offset < minOffset
      ) {
        return false;
      }

      if (
        maxOffset !== null &&
        offset > maxOffset
      ) {
        return false;
      }

      return true;
    });

    if (sort === "priceAsc") {
      result = [...result].sort(
        (a, b) =>
          toNumber(a.price_usd) - toNumber(b.price_usd)
      );
    }

    if (sort === "priceDesc") {
      result = [...result].sort(
        (a, b) =>
          toNumber(b.price_usd) - toNumber(a.price_usd)
      );
    }

    return result;
  }, [
    diameters,
    widths,
    boltPatterns,
    finishes,
    minOffset,
    maxOffset,
    sort,
  ]);

  return (
    <main className="min-h-screen bg-[#1F2833]">
      <div className="mx-auto w-full max-w-7xl px-6">
        <FilterBar
          matchCount={filteredWheels.length}
          diameters={diameters}
          widths={widths}
          boltPatterns={boltPatterns}
          finishes={finishes}
          availableDiameters={availableDiameters}
          availableWidths={availableWidths}
          availableBoltPatterns={availableBoltPatterns}
          availableFinishes={availableFinishes}
          minOffset={minOffset}
          maxOffset={maxOffset}
          sort={sort}
          onDiameterChange={toggleDiameter}
          onWidthChange={toggleWidth}
          onBoltPatternChange={toggleBoltPattern}
          onFinishChange={toggleFinish}
          onMinOffsetChange={setMinOffset}
          onMaxOffsetChange={setMaxOffset}
          onSortChange={setSort}
          clearFilters={clearFilters}
        />

        {filteredWheels.length > 0 ? (
          <WheelGrid wheels={filteredWheels} />
        ) : (
          <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
            <h2 className="mb-2 text-2xl font-semibold text-[#6cf9f4]">
              No wheels match your filters
            </h2>

            <p className="mb-6 text-[#6cf9f4]/70">
              Try removing some filters or clear everything to see all available
              wheels.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-md bg-[#212841] px-5 py-3 font-medium text-[#6cf9f4] transition-all duration-200 hover:-translate-y-1 hover:bg-[#2b3556]"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}