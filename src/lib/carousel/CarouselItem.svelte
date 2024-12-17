<script lang="ts" module>
import { getContext, onMount, type Snippet } from "svelte";
import { tv } from "tailwind-variants";
import type { CarouselContext, Direction } from "./Carousel.svelte";

const carouselItemVariants = tv({
    base: "absolute w-full h-full shrink-0 overflow-hidden",
    variants: {
        direction: {
            row: "left-full top-0 -z-10",
            col: "left-0 top-full -z-10",
            true: "left-0 top-0 z-0",
        },
    }
});

type CarouselItemProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    children:Snippet;
}

</script>

<script lang="ts">

const context = getContext("carousel") as CarouselContext;
if(!context) {
    throw new Error("CarouselItem not in the carousel context!");
}

// carousel item index
const index = ++context.count - 1;

const {
    id,
    ref,
    class:className,
    children
}:CarouselItemProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

let style = "";

function play(direction:Direction, action:"next"|"prev", scene:"enter"|"exit") {
    switch (action) {
        case "next":
            switch(scene) {
                case "enter":
                    if(direction === "row") {
                        // left -100 to 0
                    } else {
                        // top -100 to 0
                    }
                    break;
                case "exit":
                    if(direction === "row") {
                        // left 0 to 100
                    } else {
                        // top 0 to 100
                    }
                    break;
            }
            break;
        case "prev":
            switch(scene) {
                case "enter":
                    if(direction === "row") {
                        // left 100 to 0
                    } else {
                        // top 100 to 0
                    }
                    break;
                case "exit":
                    if(direction === "row") {
                        // left 0 to -100
                    } else {
                        // top 0 to -100
                    }
                    break;
            }
            break;
    }
}

</script>

<div
    bind:this={el}
    id={id}
    class={carouselItemVariants({direction: context.index === index ? true : context.direction, className})}
>
    {@render children()}
</div>
