import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
    value: number;
    variant: "points";
};

export const ResultCard = ({ value, variant }: Props) => {
    const imageSrc = variant === "points" ? "/points.svg" : "";

    return (
        <div className={cn("rounded-2xl border-2 w-full", variant === "points" && "bg-orange-400 border-orange-400",)}>
            <div className={cn("p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs", variant === "points" && "bg-orange-400")}>
                {variant === "points" && "Total XP"}
            </div>
            <div className={cn("rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg", variant === "points" && "text-orange-400")}>
                <Image src={imageSrc} alt="Points" height={30} width={30} className="mr-1.5" />
                {value}
            </div>
        </div>
    )
};