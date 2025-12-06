'use client';
import {useState} from "react";
import {Slider} from "@/components/ui/slider";

/**
 * This component wraps the slider and turns it into a stateful component that keeps track of the currently set value.
 * The id and name elements are only used to identify the current value of the slider in a form element.
 */

export default function SliderWithValue({ name, defaultVal, className, ...props } : { name: string; defaultVal?: number; className?: string; [key : string] : any }) {
    const [sliderVal, setSliderVal] = useState<number[]>([defaultVal ?? 0]);

    return (
        <div className={`flex flex-col ${className}`}>
            <p>{name}</p>
            <div className="flex flex-row align-middle justify-center">
                <Slider
                    id={name}
                    value={sliderVal}
                    onValueChange={value => {setSliderVal(value);}}
                    {...props}
                />
                <p className="pl-6">
                    {(sliderVal.at(0)! / 10).toFixed(1)}
                </p>
            </div>
        </div>
    )
}