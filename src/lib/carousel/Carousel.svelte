<script lang="ts" module>
import { onMount, setContext, type Snippet } from "svelte";
import { tv } from "tailwind-variants";

export type CarouselInstance = {
    next:{():void};
    prev:{():void};
    position:{(index:number):void};
}

const carouselVariants = tv({
    slots: {
        carousel: "relative w-full h-full rounded-lg group overflow-hidden",
        control: "flex w-full h-full justify-between items-center pointer-events-none absolute left-0 top-0 z-50 invisible group-hover:visible",
        chevron: "flex items-center justify-center rounded-lg w-16 h-16 text-base text-white cursor-pointer pointer-events-auto",
        indicator: "flex flex-row justify-center w-full absolute bottom-5 left-0 gap-2 z-50 bg-transparent",
        indicatorItem: "h-0.5 bg-white rounded-lg transition-all",
    },
    variants: {
        activeIndicator: {
            true: {
                indicatorItem: "w-4",
            },
            false: {
                indicatorItem: "w-3 opacity-50 cursor-pointer",
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
type CarouselListener = {(index:number):void};

export type CarouselContext = {
    index:number;
    duration?:number;
    direction?:Direction;
    handlers:CarouselHandler[];
    lock:boolean;
    onenterstart?:CarouselListener;
    onenterend?:CarouselListener;
    onexitstart?:CarouselListener;
    onexitend?:CarouselListener;
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
    // event
    onenterstart?:CarouselListener;
    onenterend?:CarouselListener;
    onexitstart?:CarouselListener;
    onexitend?:CarouselListener;
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
    onenterstart,
    onenterend,
    onexitstart,
    onexitend,
    children
}:CarouselProps = $props();

const handlers:CarouselHandler[] = [];

let context:CarouselContext = {
    index: defaultIndex,
    duration,
    direction,
    handlers,
    lock:false,
    onenterstart,
    onenterend,
    onexitstart,
    onexitend,
};

setContext("carousel", context);

let current = $state(defaultIndex);

// play next or prev
function play(action:CarouselAction, index?:number) {
    if(context.lock) {
        return
    }

    context.lock = true;

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

export function prev() {
    play("prev");
}

export function next() {
    play("next");
}

export function position(index:number) {
    if(index !== current) {
        play(index > current ? "next" : "prev", index);
    }
}

let timer:number;

function onmouseenter() {
    if(timer) {
        clearInterval(timer);
    }
}

function onmouseleave() {
    timer = setInterval(next, interval * 1000);
}

let mountIndicator:boolean = $state(false);
let el:HTMLElement;

onMount(() => {
    ref?.(el);

    if(autoplay) {
        timer = setInterval(next, interval * 1000);
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
            onclick={prev}
        >
            <ChevronLeft 
                size={25}
            />
        </button>
        <button 
            class={chevron()}
            onclick={next}
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
                    {...(activeIndicator ? {}:{onmouseup: () => position(i)})}
                ></div>
            {/each}
        </div>
    {/if}

    {@render children()}
</div>
