<script lang="ts" module>

interface WatermarkParams {
    // watermark width
    width?:number;
    // watermark height
    height?:number;
    // watermark text
    text?:string;
    // text size
    textSize?:number;
    // text color
    textColor?:string;
    // text weight
    textWeight?: 'normal' | 'thin' | 'extralight' | 'light' | 'medium' | 'semibold' | 'bold' | 'extrabold';
    // text rotate deg
    rotate?:number;
    // text offset x
    offsetX?:number;
    // text offset y
    offsetY?:number;
    // watermark background
    backgroundColor?:string;
}

function watermark(wp:WatermarkParams) { 
    const img = `<svg xmlns='http://www.w3.org/2000/svg' style='background-color:${wp.backgroundColor};font-size:${wp.textSize}px;font-weight:${wp.textWeight}' width='${wp.width}px' height='${wp.height}px' viewBox='0 0 ${wp.width} ${wp.height}'><text x='${wp.offsetX}' y='${wp.offsetY}' fill='${wp.textColor}' transform='rotate(${wp.rotate} 0 0)'>${wp.text}</text></svg>`;
    return "data:image/svg+xml;base64," + btoa(img);
}

</script>

<script lang="ts">
import { twMerge } from "tailwind-merge";
import { onMount } from "svelte";

interface WatermarkProps extends WatermarkParams {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    zIndex?:number;
}

let {
    id,
    ref,
    class:className,
    width = 200,
    height = 100,
    text = "FiveUI",
    textSize = 15,
    textColor = "#CBD5E1",
    textWeight = "thin",
    backgroundColor = "#F8FAFC",
    rotate = -18,
    offsetX = -18,
    offsetY = 90,
    zIndex = 10,
}:WatermarkProps = $props();

const wm = watermark({
    width,
    height,
    text,
    textSize,
    textColor,
    textWeight,
    offsetX,
    offsetY,
    rotate,
    backgroundColor
});

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div
    aria-label="Watermark"
    bind:this={el}
    id={id}
    class={twMerge("absolute w-full h-full top-0 left-0 pointer-events-none bg-repeat bg-left-top", className)}
    style:z-index={zIndex}
    style:background-image={`url(${wm})`}
>
</div>
