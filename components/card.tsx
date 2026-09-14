"use client";

import Image from "next/image";
import { useState } from "react";

type Wheel = {
    brand: string;
    model: string;
    finish: string;
    imageUrl: string;
    price: string;
    diameter: string;
    width: string;
    offset: string;
    boltPattern: string;
    weight: string | null;
    eager?: boolean;
};

export default function Card({
    brand,
    model,
    finish,
    imageUrl,
    price,
    diameter,
    width,
    offset,
    boltPattern,
    weight,
    eager,
}: Wheel) {
    const [imageError, setImageError] = useState(!imageUrl);

    return (
        <div className="flex w-full max-w-[320px] flex-col overflow-hidden rounded-lg shadow-2xl transition-transform duration-200 hover:-translate-y-2">

            <div className="flex aspect-square items-center justify-center bg-[#1F2833]">
                {imageError ? (
                    <div className="flex flex-col items-center text-center text-[#6cf9f4]/60">
                        <p className="text-sm">
                            Image unavailable
                        </p>

                        <p className="mt-1 text-xs">
                            {brand} {model}
                        </p>
                    </div>
                ) : (
                    <Image
                        src={imageUrl}
                        alt={`${brand} ${model}`}
                        width={500}
                        height={500}
                        className="h-full w-full object-contain"
                        loading={eager ? "eager" : "lazy"}
                        onError={() => setImageError(true)}
                    />
                )}
            </div>

            <div className="flex flex-1 flex-col gap-3 bg-[#212841] p-4 text-[#6cf9f4]">
                <div>
                    <h2 className="font-semibold">
                        {brand}
                    </h2>

                    <p className="text-sm">
                        {model}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div>
                        <p className="opacity-60">Size</p>
                        <p>
                            {diameter}" × {width}"
                        </p>
                    </div>

                    <div>
                        <p className="opacity-60">Offset</p>
                        <p>{offset} mm</p>
                    </div>

                    <div>
                        <p className="opacity-60">Bolt Pattern</p>
                        <p>{boltPattern}</p>
                    </div>

                    <div>
                        <p className="opacity-60">Finish</p>
                        <p>{finish}</p>
                    </div>

                    {weight && (
                        <div>
                            <p className="opacity-60">Weight</p>
                            <p>{weight} lbs</p>
                        </div>
                    )}
                </div>

                <div className="mt-auto border-t border-[#6cf9f4]/20 pt-3">
                    <p className="text-lg font-bold">
                        {price.startsWith("$") ? price : `$${price}`}
                    </p>
                </div>
            </div>
        </div>
    );
}