import Card from "./card";

type Wheel = {
    sku: string;
    brand: string;
    model: string;
    finish: string;
    width_in: string;
    image_url: string;
    offset_mm: string;
    price_usd: string;
    weight_lb: string | null;
    diameter_in: string;
    bolt_pattern: string;
};

type Wheels = {
    wheels: Wheel[];
};

export default function WheelGrid({ wheels }: Wheels) {
    return (
        <div className="flex max-w-[70vw] flex-wrap justify-center gap-6">
            {wheels.map((wheel, index) => (
                <Card
                    key={wheel.sku}
                    brand={wheel.brand}
                    model={wheel.model}
                    finish={wheel.finish}
                    imageUrl={wheel.image_url}
                    price={wheel.price_usd}
                    diameter={wheel.diameter_in}
                    width={wheel.width_in}
                    offset={wheel.offset_mm}
                    boltPattern={wheel.bolt_pattern}
                    weight={wheel.weight_lb}
                    eager={index === 0}
                />
            ))}
        </div>
    );
}