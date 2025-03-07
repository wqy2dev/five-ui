<script lang="ts" module>
import { onMount, getContext, type Snippet } from "svelte";
import { tv } from "tailwind-variants";
import { type RadioContext } from "./RadioGroup.svelte";

const radioVariants = tv({
    slots: {
        base: "align-top inline-flex flex-row items-center w-fit h-fit leading-none gap-2 mr-3",
        inner: "relative block leading-0 w-5 h-5 bg-white border-solid cursor-pointer rounded-full overflow-hidden transition-all",
    },
    variants: {
        disabled:{
            true: {
                inner: "cursor-not-allowed",
            }
        },
        focus: {
            true: {
                inner: "ring ring-primary-200",
            }
        },
        checked: {
            true: {
                inner: "border-[6px] border-primary-600",
            },
            false: {
                inner: "border-2 border-slate-300",
            }
        },
    },
    compoundVariants: [
        {
            disabled: false,
            checked: false,
            class: {
                inner: "hover:border-slate-600",
            }
        },
        {
            disabled: true,
            checked: true,
            class: {
                inner: "border-primary-400",
            }
        },
        {
            disabled: true,
            checked: false,
            class: {
                inner: "border-slate-200 bg-slate-50",
            }
        },
    ],
    defaultVariants: {
        focus: false,
        checked: false,
        disabled: false,
    },
});

type RadioProps = {
	value:string|number;
    class?:string;
    disabled?:boolean;
    render?:Snippet<[{focus?:boolean;checked?:boolean;disabled?:boolean;}]>;
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
    disabled = false,
    render,
    children,
}:RadioProps = $props();

let focus = $state(false);
let checked = $state(context.value === value);

function onblur(e:Event) {
    if(!el.contains(e.target as HTMLButtonElement)) {
        focus = false;
    }
}

function onchange(_:Event) {
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

const {
    base,
    inner,
} = radioVariants();

</script>

<label
    class={render ? className:base({className})}
>
    <span
        bind:this={el}
        class={render ? "":inner({focus, checked, disabled})}
    >
        {#if render}
            {@render render({focus, disabled, checked})}
        {/if}
    </span>

    {#if !render}
        <span class="text-sm">
            {@render children?.()}
        </span>
    {/if}

    <input
        class="hidden"
        type="radio"
        name={context.name}
        disabled={disabled}
        onchange={onchange}
    />
</label>

<svelte:window 
    onmousedown={onblur}
/>
