<script lang="ts" module>
import { onMount, setContext, type Snippet } from "svelte";
import { tv } from "tailwind-variants";

const carouselVariants = tv({
    slots: {
        carousel: "relative w-full h-full group overflow-hidden",
        control: "flex w-full h-full justify-between items-center pointer-events-none absolute left-0 top-0 z-50 invisible group-hover:visible",
        chevron: "flex items-center justify-center rounded-lg w-16 h-16 text-base text-white cursor-pointer pointer-events-auto",
        indicator: "flex flex-row justify-center w-full absolute bottom-5 left-0 gap-2 z-50 bg-transparent",
        indicatorItem: "h-1 bg-white rounded-lg transition-all",
    },
    variants: {
        activeIndicator: {
            true: {
                indicatorItem: "w-5",
            },
            false: {
                indicatorItem: "w-4 opacity-50 cursor-pointer",
            },
        }
    },
    defaultVariants: {
        activeIndicator: false, 
    },
});

export type Direction = "row"|"col";
export type CarouselAction = "next"|"prev";
export type CarouselScene = "enter"|"exit";

type CarouselHandler = {(direction:Direction, action:CarouselAction, scene:CarouselScene):void};

export type CarouselContext = {
    index:number;
    duration?:number;
    direction?:Direction;
    handlers:CarouselHandler[];
}

type CarouselProps = {
    id?:string;
    ref?:{(el:HTMLElement):void};
    class?:string;
    children:Snippet;
    // duration milliseconds
    duration?:number;
    // interval seconds, interval less than duration
    interval?:number;
    // display default carousel by index
    defaultIndex?:number;
    // movement direction: row or col, default row
    direction?:Direction;
    // whether to play automatically, default true
    autoplay?:boolean;
    // stop when the mouse hovers over it
    hover?:boolean;
    // display indicator
    indicator?:boolean;
}

</script>

<script lang="ts">
import { ChevronLeft, ChevronRight } from "$lib/icons/index.js";

const {
    id,
    ref,
    class:className,
    defaultIndex = 0,
    duration = 1000,
    direction = "row",
    interval = 5,
    indicator:showIndicator = true,
    autoplay = true,
    hover = true,
    children
}:CarouselProps = $props();

const handlers:CarouselHandler[] = [];

let current = $state(defaultIndex);

// play prev
function onprev() {
    play("prev");
}

// play next
function onnext() {
    play("next");
}

function onindicator(index:number) {
    if(index !== current) {
        play(index > current ? "next" : "prev", index);
    }
}

// play next or prev
function play(action:CarouselAction, index?:number) {
    handlers[current](direction, action, "exit");

    if(index !== undefined) {
        current = index;
    } else if(action === "prev") {
        // prev index
        current = (current === 0 ? handlers.length : current) - 1;
    } else {
        // next index
        current = current === handlers.length - 1 ? 0 : current + 1;
    }

    handlers[current](direction, action, "enter");
}

let timer:number;

function onmouseenter() {
    if(timer) {
        clearInterval(timer);
    }
}

function onmouseleave() {
    timer = setInterval(onnext, interval * 1000);
}

setContext<CarouselContext>("carousel", {
    index: defaultIndex,
    duration,
    direction,
    handlers,
});

let mountIndicator:boolean = $state(false);
let el:HTMLElement;

onMount(() => {
    ref?.(el);

    if(autoplay) {
        timer = setInterval(onnext, interval * 1000);
    }

    mountIndicator = true;
});

const {
    control,
    chevron,
    carousel,
    indicator,
    indicatorItem,
} = carouselVariants();

</script>

<div
    bind:this={el}
    id={id}
    class={carousel({className})}
    {...(hover && autoplay ? {onmouseenter, onmouseleave}:{})}
>
    <div class={control()}>
        <button
            class={chevron()}
            onclick={onprev}
        >
            <ChevronLeft 
                size={25}
            />
        </button>
        <button 
            class={chevron()}
            onclick={onnext}
        > 
            <ChevronRight
                size={25}
            />
        </button>
    </div>

    {#if mountIndicator && showIndicator}
        <div class={indicator()}>
            {#each handlers as _,i}
                {@const activeIndicator = current === i}

                <div
                    class={indicatorItem({activeIndicator})}
                    style={`transition-duration:${duration}ms;`}
                    {...(activeIndicator ? {}:{onmouseup: () => onindicator(i)})}
                ></div>
            {/each}
        </div>
    {/if}

    {@render children()}
</div>
