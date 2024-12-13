<script module lang="ts">
import { tv } from "tailwind-variants";
import { type Snippet, getContext, onMount } from "svelte";
import { type AccordionContext } from "./Accordion.svelte";
import { ChevronRight } from "$lib/icons/index.js";
import { slide } from "svelte/transition";

const accordionItemVariants = tv({
    slots: {
        base: "relative w-full",
        arrow: "transition-transform",
    },
    variants: {
        expand: {
            true: {
                arrow: "rotate-90",
            },
        },
    },
    defaultVariants: {
        expand: false,
    },
});

type AccordionItemProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    key:string;
    title:string|Snippet;
    children?:Snippet;
}

</script>

<script lang="ts">

const context = getContext("accordion") as AccordionContext;
if(!context) {
    throw new Error("the AccordionItem not in the accordion context!");
}

let {
	id,
	ref,
    key,
    title,
    class:className,
    children
}:AccordionItemProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

let expand = $state(false);

function onclick() {
    expand = !expand;
    context.onchange?.(key, expand);
}

const {
    base,
    arrow,
} = accordionItemVariants();

</script>

<div
    bind:this={el}
    id={id}
    class={base({className})}
>
    <button
        type="button"
        class="w-full flex flex-row items-center py-3"
        onclick={onclick}
    >
        <div class="grow text-start">
            {#if typeof title === "string"}
                <span class="text-base text-slate-900">
                    {title}
                </span>
            {:else}
                {@render title()}
            {/if}
        </div>
        <div class="flex items-center ml-auto shrink-0">
            <ChevronRight 
                size={14}
                class={arrow({expand})}
            />
        </div>
    </button>
    {#if expand}
        <div 
            class="pb-3"
            transition:slide={{duration:300}}
        >
            {@render children?.()}
        </div>
    {/if}
</div>
