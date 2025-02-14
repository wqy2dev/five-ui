<script lang="ts" module>
import { Check } from "$lib/icons/index.js";
import { getContext, onMount, type Snippet } from "svelte";
import { tv } from "tailwind-variants";

const optionVariants = tv({
    base:"relative flex flex-row items-center w-full h-8 leading-8 rounded-md px-3 mt-1 outline-none",
    variants:{
        disabled: {
            true: "text-slate-400 cursor-not-allowed",
            false: "text-slate-700 hover:bg-slate-50 ",
        },
    },
});

export type SelectOption = {
    label:string|Snippet;
    value?:string|number;
}

type OptionProps = SelectOption & {
    class?:string;
    disabled?:boolean;
    children?:Snippet;
}

</script>

<script lang="ts">

let {
    label,
    value,
    class:className,
    disabled,
    children,
}:OptionProps = $props();

let option = getContext<SelectOption>("select");
if(!option) {
    throw new Error("Option not in the Select!");
}

function select() {
    option.label = label;
    option.value = value;
}

let checked = $state(false);

$effect(() => {
    // update status
    checked = option.value === value;
    // update label
    if(checked) {
        option.label = label;
    }
});

</script>

<button 
    type="button"
    class={optionVariants({disabled, className})}
    onmousedown={select}
    disabled={disabled}
>
    <div class="flex flex-row items-center justify-start grow shrink-0 text-sm overflow-hidden">
        {#if children}
            {@render children()}
        {:else if typeof label === "string"}
            {label}
        {:else}
            {@render label()}
        {/if}
    </div>

    <div class="w-4">
        {#if checked}
            <Check size={16}/>
        {/if}
    </div>
</button>
