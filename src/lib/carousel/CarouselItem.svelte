<script lang="ts" module>
import { getContext, onMount, tick, type Snippet } from "svelte";
import { tv } from "tailwind-variants";
import type { CarouselAction, CarouselContext, CarouselScene, Direction } from "./Carousel.svelte";

function position(direction:Direction, action:CarouselAction, scene:CarouselScene) {
    if(action === "next") {
        if(scene === "enter") {
            if(direction === "row") {
                // left -100 to 0
                return ["-left-full", "left-0"];
            }
            // top -100 to 0
            return ["-top-full", "top-0"];
        }

        // exit
        if(direction === "row") {
            // left 0 to 100
            return ["left-0", "left-full"];
        }

        // top 0 to 100
        return ["top-0", "top-full"];
    }

    // prev
    if(scene === "enter") {
        if(direction === "row") {
            // left 100 to 0
            return ["left-full", "left-0"];
        }
        // top 100 to 0
        return ["top-full", "top-0"];
    }

    // exit
    if(direction === "row") {
        // left 0 to -100
        return ["left-0", "-left-full"];
    }

    // top 0 to -100
    return ["top-0", "-top-full"];
}

const carouselItemVariants = tv({
    base: "absolute w-full h-full shrink-0 overflow-hidden",
    variants: {
        direction: {
            row: "left-full top-0",
            col: "left-0 top-full",
            true: "left-0 top-0",
        },
    }
});

type CarouselItemProps = {
    class?:string;
    children:Snippet;
}

</script>

<script lang="ts">

const context = getContext("carousel") as CarouselContext;
if(!context) {
    throw new Error("CarouselItem not in the carousel context!");
}

const {
    class:outClass = "",
    children
}:CarouselItemProps = $props();

let className = $state(outClass);
let carouselScene = "";

function handler(direction:Direction, action:CarouselAction, scene:CarouselScene) {
    const [ from, to ] = position(direction, action, scene);

    carouselScene = scene;

    // immediately reactive
    className = `${outClass} ${from} transition-none`;

    setTimeout(() => {
        // delay reactive
        className = `${outClass} ${to} transition-all`;
    }, 30);
}

// carousel item index
let index:number = $state(-1);

onMount(() => {
    context.handlers.push(handler), index = context.handlers.length - 1;
});

function ontransitionend() {
    if(carouselScene === "exit") {
        context.lock = false;
    }
}

</script>

{#if index > -1}
<div
    class={carouselItemVariants({direction: context.index === index ? true : context.direction, className})}
    style={`transition-duration:${context.duration}ms;`}
    ontransitionend={ontransitionend}
>
    {@render children()}
</div>
{/if}
