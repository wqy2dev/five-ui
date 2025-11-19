<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";

const switchVariants = tv({
    slots: {
        base: "relative inline-flex items-center p-1 transition-all",
        button: "flex items-center justify-center bg-white cursor-inherit pointer-events-none transition-all",
        text: "flex items-center justify-center text-slate-600",
    },
    variants: {
        size: {
            sm:{
                base:"w-10 h-5 text-[11px]",
                button: "w-3 h-3",
                text: "w-5",
            },
            md:{
                base:"w-12 h-6 text-[12px]",
                button: "w-4 h-4",
                text: "w-6",
            },
            lg:{
                base:"w-14 h-7 text-[12px]",
                button: "w-5 h-5",
                text: "w-7",
            }
        },
        radius: {
            sm: {
                base:"rounded-sm",
                button:"rounded-sm",
            },
            md: {
                base:"rounded-md",
                button:"rounded-md",
            },
            lg: {
                base:"rounded-lg",
                button:"rounded-lg",
            },
            full: {
                base:"rounded-full",
                button:"rounded-full",
            }
        },
        disabled:{
            true: {
                base: "opacity-45 cursor-not-allowed",
            },
            false: {
                base:"",
            },
        },
        focus: {
            true: {
                base: "ring ring-primary-200",
            },
            false: {
                base:"",
            },
        },
        on:{
            true: {
                base: "bg-primary-600 flex-row",
                text: "text-white",
            },
            false: {
                base: "bg-slate-200 flex-row-reverse",
                text: "text-slate-600",
            },
        },
    },
    compoundVariants: [
       
    ],
    defaultVariants: {
        disabled: false,
        radius: "full",
        size: "md",
    },
});

type Size = VariantProps<typeof switchVariants>["size"];
type Radius = VariantProps<typeof switchVariants>["radius"];

type SwitchProps = {
    id?:string;
    class?:string;
    name?:string;
    value:string|number;
    size?:Size;
    radius?:Radius,
    onText?:string;
    onValue:string|number;
    offText?:string;
    offValue:string|number;
    disabled?:boolean;
    thumb?:Snippet<[{on:boolean}]>;
    ref?:{(el:HTMLElement):void};
    onchange?:{(value?:string|number):void};
}

</script>

<script lang="ts">
import { getContext, onMount, type Snippet } from "svelte";
import type { FormFieldContext } from "$lib/form/FormField.svelte";

let {
    id,
    class:className,
    size,
    name,
    value,
    radius,
    disabled,
    onText,
    onValue,
    offText,
    offValue,
    thumb,
    ref,
    onchange:change,
}:SwitchProps = $props();

if(value !== onValue && value !== offValue) {
    throw new Error("switch value must be either onValue or offValue!");
}

const fieldContext = getContext<FormFieldContext>("formField");
if(fieldContext) {
    name = fieldContext.name;
    value = "";
    change = fieldContext.onchange;

    let t = typeof fieldContext.value;

	if(t === "string" || t === "number") {
        value = fieldContext.value;
    }
}

let on = $state(value === onValue);
let focus = $state(false);

function onchange() {
    if(!disabled) {
        on = !on, focus = true;
        change?.(on?onValue:offValue);
    }
}

let el:HTMLElement;

function onblur(e:Event) {
    if(!el.contains(e.target as HTMLButtonElement)) {
        focus = false;
    }
}

onMount(() => {
    ref?.(el);
});

const {
    base,
    text,
    button,
} = switchVariants({disabled, radius, size});
</script>

<button
    bind:this={el}
    id={id}
    class={base({on, focus, className})}
    type="button"
    disabled={disabled}
    onmouseup={onchange}
>
    {#if (on && onText) || (!on && offText)}
        <span class={text({on})}>
            {on?onText:offText}
        </span>
    {/if}

    <span class={button({on})}>
        {#if thumb}
            {@render thumb({on})}
        {/if}
    </span>
</button>

<input
    type="hidden"
    name={name}
    value={on?onValue:offValue}
/>

<svelte:window 
    onmousedown={onblur}
/>
