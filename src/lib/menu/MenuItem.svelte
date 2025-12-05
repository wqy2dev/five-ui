<script lang="ts" module>
import { getContext, onMount, type Snippet } from "svelte";
import type { MenuContext } from "./Menu.svelte";
import { tv } from "tailwind-variants";
import type { HTMLAttributeAnchorTarget } from "svelte/elements";

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

type MenuItemExtra = {
    label?:string;
    value?:string;
    link?:boolean;
    disabled?:boolean;
    target?:HTMLAttributeAnchorTarget | null;
}

export type MenuItemProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    disabled?:boolean;
    label?:string;
    value?:string;
    link?:boolean;
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

function oncommand(e:Event) {
    if(!disabled) {
        ctx.value = value, ctx.label = label;
    } else {
        e.preventDefault();
    }
}

let checked = $state(false);

$effect(() => {
    checked = ctx.stateful === true && ctx.value === value;
});

let el:HTMLElement;

onMount(() => {
    ref?.(el);

    if(ctx.value === value) {
        ctx.label = label;
        ctx.value = value;

        if(ctx.stateful === true) {
            ctx.target = el;
        }
    }
});

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
    bind:this={el}
    id={id}
    this={link ? "a":"button"}
    class={meunItemVariants({size:ctx.size, checked, disabled, className})}
    onclick={oncommand}
    {...(link ? {href:value, target}: {type: "button", disabled})}
>
    {@render children()}

    {#if extra}
        {@render extra({label, value, link, target})}
    {/if}
</svelte:element>
