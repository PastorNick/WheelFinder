export type SortOption = "none" | "priceAsc" | "priceDesc";

type FilterBar = {
    matchCount: number;

    diameters: number[];
    widths: number[];
    boltPatterns: string[];
    finishes: string[];

    availableDiameters: number[];
    availableWidths: number[];
    availableBoltPatterns: string[];
    availableFinishes: string[];

    minOffset: number | null;
    maxOffset: number | null;

    sort: SortOption;

    onDiameterChange: (value: number) => void;
    onWidthChange: (value: number) => void;
    onBoltPatternChange: (value: string) => void;
    onFinishChange: (value: string) => void;

    onMinOffsetChange: (value: number | null) => void;
    onMaxOffsetChange: (value: number | null) => void;

    onSortChange: (value: SortOption) => void;

    clearFilters: () => void;
};

export default function FilterBar({
    matchCount,
    diameters,
    widths,
    boltPatterns,
    finishes,
    availableDiameters,
    availableWidths,
    availableBoltPatterns,
    availableFinishes,
    minOffset,
    maxOffset,
    sort,
    onDiameterChange,
    onWidthChange,
    onBoltPatternChange,
    onFinishChange,
    onMinOffsetChange,
    onMaxOffsetChange,
    onSortChange,
    clearFilters,
}: FilterBar) {
    const dropdownButton = "cursor-pointer list-none rounded-md bg-[#0B0C10] px-4 py-2 text-[#6cf9f4] transition-colors duration-200 hover:bg-[#212841]";

    const dropdownMenu = "absolute left-0 top-full z-50 mt-2 min-w-[180px] rounded-md bg-[#212841] p-3 text-[#6cf9f4] shadow-xl";

    const checkboxRow = "flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-[#1F2833]";

    return (
        <div className="w-full py-6">

            <div className="flex w-full flex-wrap items-center justify-center gap-4">

                <details className="relative">
                    <summary className={dropdownButton}>
                        Diameter ▾
                        {diameters.length > 0 && ` (${diameters.length})`}
                    </summary>

                    <div className={dropdownMenu}>
                        {availableDiameters.map((diameter) => (
                            <label
                                key={diameter}
                                className={checkboxRow}
                            >
                                <input
                                    type="checkbox"
                                    checked={diameters.includes(diameter)}
                                    onChange={() => onDiameterChange(diameter)}
                                />

                                {diameter}"
                            </label>
                        ))}
                    </div>
                </details>

                <details className="relative">
                    <summary className={dropdownButton}>
                        Width ▾
                        {widths.length > 0 && ` (${widths.length})`}
                    </summary>

                    <div className={dropdownMenu}>
                        {availableWidths.map((width) => (
                            <label
                                key={width}
                                className={checkboxRow}
                            >
                                <input
                                    type="checkbox"
                                    checked={widths.includes(width)}
                                    onChange={() => onWidthChange(width)}
                                />

                                {width}"
                            </label>
                        ))}
                    </div>
                </details>

                <details className="relative">
                    <summary className={dropdownButton}>
                        Offset ▾
                    </summary>

                    <div className={`${dropdownMenu} w-[220px]`}>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="mb-1 block text-xs opacity-70">
                                    Min
                                </label>

                                <input
                                    type="number"
                                    value={minOffset ?? ""}
                                    placeholder="Min"
                                    onChange={(e) =>
                                        onMinOffsetChange(
                                            e.target.value === ""
                                                ? null
                                                : Number(e.target.value)
                                        )
                                    }
                                    className="w-full rounded-md bg-[#1F2833] px-2 py-1 text-[#6cf9f4] outline-none"
                                />
                            </div>

                            <div className="flex-1">
                                <label className="mb-1 block text-xs opacity-70">
                                    Max
                                </label>

                                <input
                                    type="number"
                                    value={maxOffset ?? ""}
                                    placeholder="Max"
                                    onChange={(e) =>
                                        onMaxOffsetChange(
                                            e.target.value === ""
                                                ? null
                                                : Number(e.target.value)
                                        )
                                    }
                                    className="w-full rounded-md bg-[#1F2833] px-2 py-1 text-[#6cf9f4] outline-none"
                                />
                            </div>

                        </div>
                    </div>
                </details>

                <details className="relative">
                    <summary className={dropdownButton}>
                        Bolt Pattern ▾
                        {boltPatterns.length > 0 &&
                            ` (${boltPatterns.length})`}
                    </summary>

                    <div
                        className={`${dropdownMenu} max-h-[300px] overflow-y-auto`}
                    >
                        {availableBoltPatterns.map((pattern) => (
                            <label
                                key={pattern}
                                className={checkboxRow}
                            >
                                <input
                                    type="checkbox"
                                    checked={boltPatterns.includes(pattern)}
                                    onChange={() =>
                                        onBoltPatternChange(pattern)
                                    }
                                />

                                {pattern}
                            </label>
                        ))}
                    </div>
                </details>

                <details className="relative">
                    <summary className={dropdownButton}>
                        Finish ▾
                        {finishes.length > 0 &&
                            ` (${finishes.length})`}
                    </summary>

                    <div
                        className={`${dropdownMenu} max-h-[300px] overflow-y-auto`}
                    >
                        {availableFinishes.map((finish) => (
                            <label
                                key={finish}
                                className={checkboxRow}
                            >
                                <input
                                    type="checkbox"
                                    checked={finishes.includes(finish)}
                                    onChange={() =>
                                        onFinishChange(finish)
                                    }
                                />

                                {finish}
                            </label>
                        ))}
                    </div>
                </details>

                <select
                    value={sort}
                    onChange={(e) =>
                        onSortChange(
                            e.target.value as SortOption
                        )
                    }
                    className="cursor-pointer rounded-md bg-[#0B0C10] px-4 py-2 text-[#6cf9f4] outline-none transition-colors duration-200 hover:bg-[#212841]"
                >
                    <option value="none">
                        Sort by Price
                    </option>

                    <option value="priceAsc">
                        Price: Low to High
                    </option>

                    <option value="priceDesc">
                        Price: High to Low
                    </option>
                </select>

            </div>

            <div className="mt-4 flex w-full items-center justify-center gap-4">

                <p className="text-sm text-[#6cf9f4]">
                    {matchCount}{" "}
                    {matchCount === 1
                        ? "wheel"
                        : "wheels"}
                </p>

                <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-md bg-[#212841] px-4 py-2 text-sm font-medium text-[#6cf9f4] transition-all duration-200 hover:-translate-y-1 hover:bg-[#2b3556]"
                >
                    Clear All
                </button>

            </div>
        </div>
    );
}