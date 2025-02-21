<script lang="ts" module>
import { onMount, getContext, type Snippet } from "svelte";
import { tv, type VariantProps } from "tailwind-variants";
import { Check } from "$lib/icons/index.js";
import { twMerge } from "tailwind-merge";
import { type CheckboxContext } from "./CheckboxGroup.svelte";

const checkboxVariants = tv({
    base: "relative flex items-center justify-center w-4 h-4 cursor-pointer box-content bg-white border-2 border-solid transition-all overflow-hidden",
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
        radius: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            full: "rounded-full",
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
    defaultVariants: {
        radius: "md",
    },
});

type Radius = VariantProps<typeof checkboxVariants>["radius"];

type CheckboxProps = {
    ref?:{(el:HTMLElement):void};
    value:string|number;
    class?:string;
    radius?:Radius;
    disabled?:boolean;
    checked?:boolean,
    children?:Snippet;
    onchange?:{(checked:boolean):void};
}
</script>

<script lang="ts">
let {
    ref,
    class:className,
    value,
    checked:defaultChecked,
    radius,
    disabled,
    children,
    onchange,
}:CheckboxProps = $props();

const context = getContext<CheckboxContext>("checkbox");

let focus = $state(false);
let checked = $state(context ? context.value && context.value.indexOf(value) > -1 : !!defaultChecked);

function onChange(e:Event & {currentTarget:HTMLInputElement}) {
    checked = e.currentTarget.checked;

    // first context
    if(context) {
        if(value !== undefined) {
            if(checked) {
                context.value.push(value);
            } else {
                const index = context.value.indexOf(value);
                if(index > -1) {
                    context.value.splice(index, 1);
                }
            }
        }

        context.onchange?.(context.value);
    }

    onchange?.(checked);
}

function onFocus(_:Event) {
    focus = true;
}

function onBlur(e:Event) {
    if(!el.contains(e.target as HTMLButtonElement)) {
        focus = false;
    }
}

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<label
    class={twMerge("inline-flex flex-row items-center align-top w-fit h-fit leading-none gap-2 mr-3", className)}
>
    <span
        bind:this={el}
        class={checkboxVariants({radius, focus, checked, disabled})}
    >
        <input
            bind:checked={checked}
            class="absolute top-0 left-0 w-4 h-4 -z-10"
            type="checkbox"
            name={context ? context.name : undefined}
            value={value}
            disabled={disabled}
            onchange={onChange}
            onclick={onFocus}
        />

        {#if checked}
            <Check size={16} class="pointer-events-none"/>
        {/if}
    </span>

    <span class="text-sm">
        {@render children?.()}
    </span>
</label>

<svelte:window
    onmousedown={onBlur}
/>
