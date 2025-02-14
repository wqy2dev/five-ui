<script lang="ts" module>
import { onMount, getContext, type Snippet } from "svelte";
import { tv } from "tailwind-variants";
import { Check } from "$lib/icons/index.js";
import { twMerge } from "tailwind-merge";
import { type RadioContext } from "./RadioGroup.svelte";

const radioVariants = tv({
    base: "relative flex items-center justify-center w-4 h-4 rounded-full cursor-pointer box-content bg-white border-2 border-solid transition-all overflow-hidden",
    variants: {
        disabled:{
            true: "cursor-not-allowed",
            false: "",
        },
        focus: {
            true: "",
            false: "",
        },
        checked: {
            true: "",
            false: "",
        },
    },
    compoundVariants: [
        {
            focus: true,
            disabled: false,
            class: "ring ring-primary-200",
        },
        {
            disabled: false,
            checked: true,
            class: "bg-primary-600 border-primary-600 text-white",
        },
        {
            disabled: false,
            checked: false,
            class: "border-slate-300 hover:border-slate-600",
        },
        {
            disabled: true,
            checked: true,
            class: "bg-primary-300 border-primary-300 text-white",
        },
        {
            disabled: true,
            checked: false,
            class: "bg-slate-50 border-slate-200",
        },
    ],
});

type RadioProps = {
	value:string|number;
    class?:string;
    disabled?:boolean;
    children?:Snippet;
    ref?:{(el:HTMLElement):void};
}
    
</script>
    

<script lang="ts">

const context = getContext<RadioContext>("radio");
if(!context) {
    throw new Error("Radio not in the RadioGroup!");
}

let {
    ref,
    class:className,
    value,
    disabled,
    children,
}:RadioProps = $props();

let focus = $state(false);
let checked = $state(context.value === value);

function onFocus(e:Event) {
    focus = true;
}

function onBlur(e:Event) {
    if(!el.contains(e.target as HTMLButtonElement)) {
        focus = false;
    }
}

function onChange(_:Event) {
    checked = true, context.value = value;
}

$effect(() => {
    // radio group status
    checked = context.value === value;
});

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<label
    class={twMerge("align-top inline-flex flex-row items-center w-fit h-fit leading-none gap-2 mr-3", className)}
>
    <span
        bind:this={el}
        class={radioVariants({focus, checked, disabled})}
    >
        <input
            bind:group={context.value}
            class="absolute top-0 left-0 w-4 h-4 -z-10"
            type="radio"
            name={context.name}
            value={value}
            disabled={disabled}
            onchange={onChange}
            onclick={onFocus}
        />

        {#if checked}
            <Check size={16} class="pointer-events-none"/>
        {/if}
    </span>

    {@render children?.()}
</label>

<svelte:window 
    onmousedown={onBlur}
/>
