<script lang="ts" module>
import { getContext, type Snippet } from "svelte";
import { tv } from "tailwind-variants";
import type { CarouselAction, CarouselContext, CarouselScene, Direction } from "./Carousel.svelte";

function position(direction:Direction, action:"next"|"prev", scene:"enter"|"exit") {
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

let cache:{
    direction?:Direction,
    scene?:CarouselScene,
} = {
    direction:undefined, 
    scene:undefined
};

let className = $state(outClass);

function handler(direction:Direction, action:CarouselAction, scene:CarouselScene) {
    const [ from, to ] = position(direction, action, scene);

    cache = {direction, scene};
    className = outClass + " transition-none " + from;

    setTimeout(() => {
        className = outClass + " transition-all " + to;
    }, 10);
}

context.handlers.push(handler);

// carousel item index
const index = context.handlers.length - 1;

function ontransitionend() {
    if(cache.scene === "exit") {
        className = outClass + " transition-none ";

        if(cache.direction === "row") {
            className += " left-full";
        } else {
            className += " -top-full";
        }
    }
}
</script>

<div
    class={carouselItemVariants({direction: context.index === index ? true : context.direction, className})}
    ontransitionend={ontransitionend}
    style="transition-duration:2000ms;"
>
    {@render children()}
</div>
