<script lang="ts" module>
import { getContext, type Snippet } from "svelte";
import type { MenuContext } from "./Menu.svelte";
import type { HTMLAttributeAnchorTarget } from "svelte/elements";
import { tv } from "tailwind-variants";

const meunItemVariants = tv({
    base: "relative flex flex-row items-center justify-between w-full h-fit mb-[2px] truncate text-left rounded-md",
    variants: {
        checked: {
            true: "bg-slate-100 text-slate-700",
        },
        size: {
            sm: "py-1 px-2 text-[13px]",
            md: "py-2 px-4 text-[14px]",
            lg: "py-3 px-5 text-[15px]"
        },
        disabled: {
            true: "text-slate-400 cursor-not-allowed",
            false: "text-slate-600 cursor-pointer hover:bg-slate-100",
        },
    },
    defaultVariants: {
        size: "md",
        checked: false,
        disabled: false,
    },
});

export type MenuItemExtra = {
    label?:string;
    value?:string;
    link?:boolean;
    checked?:boolean;
    disabled?:boolean;
    hover?:boolean;
    target?:HTMLAttributeAnchorTarget | null;
}

export type MenuItemProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    label?:string;
    value:string;
    link?:boolean;
    disabled?:boolean;
    target?:HTMLAttributeAnchorTarget | null;
    extra?:Snippet<[MenuItemExtra]>;
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
    disabled,
    link,
    target,
    extra,
    children,
}:MenuItemProps = $props();

let elRef:HTMLElement;

function mount(el:HTMLElement) {
    ref?.(el);

    if(ctx.stateful) {
        elRef = el;
    }

    if(ctx.value === value) {
        ctx.oncommand?.(value, label, el);
    }
}

function oncommand(e:Event) {
    if(disabled) {
        e.preventDefault();
    } else {
        ctx.value = value, ctx.oncommand?.(value, label, elRef);
    }
}

let hover = $state(false);

function onhover(e:Event) {
    hover = e.type === "mouseenter";
}

let checked = $derived.by(() => {
    return ctx.stateful === true && ctx.value === value;
});

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
    use:mount
    id={id}
    this={link ? "a":"button"}
    class={meunItemVariants({size:ctx.size, disabled, checked, className})}
    onclick={oncommand}
    {...(extra && !disabled ? {
        onmouseenter:onhover,
        onmouseleave:onhover
    }:{})}
    {...(link ? {href:value, target}: {type: "button", disabled})}
>
    {@render children()}

    {#if extra}
        {@render extra({label, value, link, target, hover, checked, disabled})}
    {/if}
</svelte:element>
