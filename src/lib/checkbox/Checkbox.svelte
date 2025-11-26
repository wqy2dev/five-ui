<script lang="ts" module>
import { onMount, getContext, type Snippet } from "svelte";
import { tv, type VariantProps } from "tailwind-variants";
import { Check } from "$lib/icons/index.ts";
import { twMerge } from "tailwind-merge";
import { type CheckboxContext } from "./CheckboxGroup.svelte";

const checkboxVariants = tv({
    base: "flex items-center justify-center w-4 h-4 cursor-pointer box-content bg-white border-2 border-solid transition-all",
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
        disabled: false,
        checked: false,
        focus: false,
    },
});

type Radius = VariantProps<typeof checkboxVariants>["radius"];

type CheckboxProps = {
    ref?:{(el:HTMLElement):void};
    value:string|number;
    class?:string;
    radius?:Radius;
    disabled?:boolean;
    checked?:boolean;
    render?:Snippet<[{radius?:Radius;focus?:boolean;checked?:boolean;disabled?:boolean;}]>;
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
    disabled = false,
    render,
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
    bind:this={el}
    class={twMerge("relative inline-flex flex-row items-center align-top w-fit h-fit leading-none mr-3", className)}
>
    {#if render}
        {@render render?.({radius, focus, checked, disabled})}
    {:else}
        <span
            class={checkboxVariants({radius, focus, checked, disabled})}
        >
            {#if checked}
                <Check size={16} class="pointer-events-none"/>
            {/if}
        </span>

        <span class="text-sm ml-2 leading-none">
            {@render children?.()}
        </span>
    {/if}

    <input
        bind:checked={checked}
        class="absolute top-1 left-1 w-2 h-2 border-none -z-10 outline-none"
        type="checkbox"
        name={context ? context.name : undefined}
        value={value}
        disabled={disabled}
        onchange={onChange}
        onclick={onFocus}
    />
</label>

<svelte:window
    onmousedown={onBlur}
/>
