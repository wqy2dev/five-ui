<script lang="ts" module>
import { ChevronDown } from "$lib/icons/index.js";
import { onMount, type Snippet } from "svelte";
import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({
    slots: {
        base:"h-9 inline-flex flex-row items-center rounded-md bg-white p-2 border border-solid border-slate-200 outline-none overflow-hidden transition",
        input:"flex flex-row items-center grow shrink-0 text-sm leading-none",
        chevron:"w-4 shrink-0 text-slate-400 transition",
        slot: "w-5 shrink-0 flex items-center justify-start text-slate-400 z-1 cursor-inherit",
    },
    variants: {
        focus: {
            true: {
                base: "ring ring-primary-200 border-primary-600",
                chevron: "rotate-180",
            },
        },
        disabled: {
            true: {
                base: "cursor-not-allowed bg-slate-50",
            }
        },
        input: {
            true: {
                input: "text-slate-900",
            },
            false: {
                input: "text-slate-400",
            }
        },
        size: {
            sm:{
                base:"h-8 leading-8",
            },
            md:{
                base:"h-9 leading-9",
            },
            lg:{
                base:"h-10 leading-10",
            }
        },
        radius: {
            sm: {
                base:"rounded-sm",
            },
            md: {
                base:"rounded-md",
            },
            lg: {
                base:"rounded-lg",
            },
            full: {
                base:"rounded-full",
            }
        },
    },
    defaultVariants: {
        disabled: false,
        radius: "md",
        size: "md",
    },
});

type Size = VariantProps<typeof inputVariants>["size"];
type Radius = VariantProps<typeof inputVariants>["radius"];

type SelectInputProps = {
    id?:string;
    width?:number|string;
    class?:string;
	name?:string;
    label?:string;
	value?:string|number;
    placeholder?:string;
    disabled?:boolean;
    size?:Size;
    radius?:Radius;
    ref?:{(el:HTMLElement):void};
    head?:Snippet;
}

</script>

<script lang="ts">

let {
    name,
    value,
    label,
    width,
    head,
    disabled,
    class: className,
    placeholder,
    ref,
    ...restProps
}:SelectInputProps = $props();

let focus = $state(false);

function onfocus(e:FocusEvent) {
    if(!disabled) {
        focus = !focus;
    }
}

function onblur(e:Event) {
    if(e.target !== el && !el.contains(e.target as any)) {
        focus = false;
    }
}

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

const {
    base,
    slot,
    input,
    chevron,
} = inputVariants();

</script>

<button 
    bind:this={el}
    type="button" 
    class={base({disabled, focus, className})}
    style:width={width}
    {...restProps}
    onmousedown={onfocus}
>
    {#if head}
        <div class={slot()}>
            {@render head()}
        </div>
    {/if}

    {#if label }
        <span class={input({input: !disabled})}>
            {label}
        </span>
    {:else if placeholder}
        <span class={input({input: false})}>
            {placeholder}
        </span>
    {/if}

    <span class={chevron({focus})}>
        <ChevronDown size={15}/>
    </span>
</button>

<input 
    type="hidden" 
    name={name}
    bind:value={value}
/>

<svelte:window 
    onmousedown={onblur}
/>