<script module lang="ts">
import { tv } from "tailwind-variants";
import { type Snippet, getContext, onMount } from "svelte";
import { type AccordionContext } from "./Accordion.svelte";
import { ChevronRight } from "$lib/icons/index.js";
import { fade, slide } from "svelte/transition";

const accordionItemVariants = tv({
    slots: {
        base: "relative w-full",
        arrow: "transition-transform",
        button: "w-full flex flex-row items-center py-3 text-sm",
    },
    variants: {
        expand: {
            true: {
                arrow: "rotate-90",
            },
        },
        disable: {
            true: {
                button: "text-slate-400 cursor-not-allowed",
            },
            false: {
                button: "text-slate-700",
            }
        },
    },
    defaultVariants: {},
});

type AccordionItemProps = {
    id?:string;
    ref?:{(el:HTMLElement):void};
    class?:string;
    headerClass?:string;
    key:string;
    title:string|Snippet;
    icon?:Snippet<[boolean]>;
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
    headerClass:headerClassName,
    icon,
    children
}:AccordionItemProps = $props();

const {
    base,
    arrow,
    button,
} = accordionItemVariants();

let expand = $state(context.expandKeys && context.expandKeys.indexOf(key) !== -1);
let disable = context.disableKeys && context.disableKeys.indexOf(key) !== -1;

function onclick() {
    if(!disable) {
        expand = !expand;
        context.onchange?.(key, expand);
    }
}

let el:HTMLElement;

onMount(() => {
    ref?.(el);

    context.shrink(key, () => {
        context.onchange?.(key, expand = false);
    });
});

</script>

<div
    bind:this={el}
    id={id}
    class={base({className})}
>
    <button
        type="button"
        class={button({disable, className:headerClassName })}
        onclick={onclick}
    >
        <div class="grow text-start">
            {#if typeof title === "string"}
                <span>
                    {title}
                </span>
            {:else}
                {@render title()}
            {/if}
        </div>
        <div class="flex items-center ml-auto shrink-0 text-slate-400">
            {#if icon}
                {@render icon(!!expand)}
            {:else}
                <ChevronRight 
                    size={14}
                    class={arrow({expand})}
                />
            {/if}
        </div>
    </button>
    {#if expand}
        <div 
            class="relative pb-3 px-0.5 overflow-hidden"
            transition:slide
        >
            <div
                class="w-full h-fit"
                transition:fade
            >
                {@render children?.()}
            </div>
        </div>
    {/if}
</div>
