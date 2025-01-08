<script lang="ts" module>
import { onMount, getContext } from "svelte";
import { tv } from "tailwind-variants";
import { Check } from "$lib/icons/index.js";
import { type RadioContext } from "./RadioGroup.svelte";

const radioVariants = tv({
    base: "relative align-top inline-flex items-center justify-center w-4 h-4 leading-none box-content rounded-full cursor-pointer transition bg-white border border-solid",
    variants: {
        disabled:{
            true: "cursor-not-allowed border-slate-400",
            false: "border-primary-600",
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
            class: "ring-offset-1 ring-2 ring-primary-600",
        },
        {
            disabled: false,
            checked: true,
            class: "bg-primary-600 text-white",
        },
        {
            disabled: true,
            checked: true,
            class: "bg-slate-400",
        },
        {
            disabled: true,
            checked: false,
            class: "bg-slate-100",
        }
    ],
    defaultVariants: {
    },
});

type RadioProps = {
    id?:string;
	value:string|number;
    class?:string;
    disabled?:boolean;
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
    disabled,
    class:className,
    value,
    ...restProps
}:RadioProps = $props();


let focus = $state(false);
let checked = $state(context.value === value);

function onFocus(e:Event) {
    if(!disabled && !focus) {
        focus = true, context.value = value;
    }
}

function onBlur(e:Event) {
    if(!el.contains(e.target as HTMLButtonElement)) {
        focus = false;
    }
}

$effect(() => {
    checked = context.value === value;
});

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<button 
    bind:this={el}
    class={radioVariants({focus, checked, disabled, className})}
    onmousedown={onFocus}
    {...{disabled}}
    {...restProps}
>
    {#if checked}
        <Check size={18}/>
    {/if}
</button>

<svelte:window 
    onmousedown={onBlur}
/>
