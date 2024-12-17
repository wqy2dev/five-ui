<script lang="ts" module>
import { onMount, setContext, type Snippet } from "svelte";
import { tv, type VariantProps } from "tailwind-variants";

const carouselVariants = tv({
    base: "inline-flex transition-all",
    variants: {
        direction: {
            row: "flex-row min-w-full h-full flex-nowrap",
            col: "flex-col w-full h-full",
        },
    },
    defaultVariants: {
        direction: "row",
    },
});

export type Direction = VariantProps<typeof carouselVariants>["direction"];

type CarouselProps = {
    id?:string;
    class?:string;
    duration?:number;
    interval?:number;
    defaultIndex?:number;
    direction?:Direction;
    ref?:{(el:HTMLElement):void};
    children:Snippet;
}

export type CarouselAction = "next"|"prev";
export type CarouselScene = "enter"|"exit";

type CarouselHandler = {(direction:Direction, action:CarouselAction, scene:CarouselScene):void};

export type CarouselContext = {
    index:number;
    direction?:Direction;
    handlers:CarouselHandler[];
}

</script>

<script lang="ts">
import { ChevronLeft, ChevronRight } from "$lib/icons/index.js";
import { twMerge } from "tailwind-merge";

const {
    id,
    ref,
    class:className,
    defaultIndex = 0,
    duration = 3000,
    interval = 5000,
    direction = "row",
    children
}:CarouselProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);

    setInterval(() => {
    }, interval);
});

const handlers:CarouselHandler[] = [];

let current = defaultIndex;

function onprev() {
    handlers[current](direction, "prev", "exit");

    current = (current === 0 ? handlers.length : current) - 1;

    handlers[current](direction, "prev", "enter");
}

function onnext() {
    handlers[current](direction, "next", "exit");

    current = current === handlers.length - 1 ? 0 : current + 1;

    handlers[current](direction, "next", "enter");
}

setContext<CarouselContext>("carousel", {
    index: current,
    direction,
    handlers,
});

</script>

<div
    bind:this={el}
    id={id}
    class={twMerge("relative w-full h-full overflow-hidden", className)}
>
    <div class="w-full h-full flex justify-between items-center pointer-events-none absolute left-0 top-0 z-30">
        <button
            class="flex items-center justify-center rounded-lg w-16 h-16 text-base text-white cursor-pointer pointer-events-auto"
            onclick={onprev}
        >
            <ChevronLeft/>
        </button>
        <button 
            class="flex items-center justify-center rounded-lg w-16 h-16 text-base text-white cursor-pointer pointer-events-auto"
            onclick={onnext}
        > 
            <ChevronRight/>
        </button>
    </div>

    <!-- <div 
        class={carouselVariants({direction})}
        style:margin-left={offset}
        ontransitionend={ontransitionend}
    >
    </div> -->

    {@render children()}
</div>
