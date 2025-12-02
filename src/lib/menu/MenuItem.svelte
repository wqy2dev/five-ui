<script lang="ts" module>
import { getContext, type Snippet } from "svelte";
import type { MenuContext } from "./Menu.svelte";
import { tv } from "tailwind-variants";
import type { HTMLAttributeAnchorTarget } from "svelte/elements";

const meunItemVariants = tv({
    base: "relative flex flex-row items-center w-full h-fit hover:bg-slate-100 disabled:hover:bg-transparent truncate text-left text-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed rounded-md",
    variants: {
        checked: {
            true: "bg-slate-100",
        },
        size: {
            sm: "py-1 px-2 text-[13px]",
            md: "py-2 px-4 text-sm",
            lg: "py-3 px-5 text-sm"
        }
    },
    defaultVariants: {
        size: "md",
        checked: false,
    },
});

type MenuItemProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    disabled?:boolean;
    label?:string;
    value?:string;
    size?:"sm"|"md"|"lg";
    link?:boolean;
    target?:HTMLAttributeAnchorTarget;
    children:Snippet;
}

</script>

<script lang="ts">
const ctx = getContext<MenuContext>("menu");
if(!ctx) {
    throw new Error("MenuItem not in the Menu!");
}

let {
    id,
    class:className,
    ref,
    label,
    value,
    size = "md",
    disabled,
    link,
    target,
    children,
}:MenuItemProps = $props();

function oncommand(_:Event) {
    if(!disabled) {
        ctx.value = value, ctx.label = label;
    }
}

let checked = $state(false);

$effect(() => {
    checked = ctx.stateful === true && ctx.value === value;
});

function mount(el:HTMLElement) {
    ref?.(el);

    if(ctx.value === value) {
        ctx.label = label;
        ctx.value = value;
    }
}

</script>

{#if link}
    <a 
        use:mount
        id={id}
        href={value}
        target={target}
        class={meunItemVariants({size, checked, className})}
    >
        {@render children()}
    </a>
{:else}
    <button
        use:mount
        id={id}
        type="button"
        disabled={disabled}
        class={meunItemVariants({size, checked, className})}
        onmousedown={oncommand}
    >
        {@render children()}
    </button>
{/if}
