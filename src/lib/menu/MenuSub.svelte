<script lang="ts" module>
import { getContext, type Snippet } from "svelte";
import type { MenuContext } from "./Menu.svelte";
import { tv } from "tailwind-variants";
import { Dropdown } from "$lib/index.js";
import { ChevronRight } from "$lib/icons/index.js";

const meunSubVariants = tv({
    base: "relative flex flex-row w-full items-center justify-between h-fit pr-1 mb-[2px] hover:bg-slate-100 truncate text-left text-slate-600 rounded-md cursor-pointer",
    variants: {
        size: {
            sm: "py-1 px-2 text-[13px]",
            md: "py-2 px-4 text-[14px]",
            lg: "py-3 px-5 text-[15px]"
        },
        disabled: {
            true: "hover:bg-transparent text-slate-400 cursor-not-allowed",
        },
    },
    defaultVariants: {
        size: "md",
        disabled: false,
    },
});

type MenuSubPlacement = "leftStart"|"leftEnd"|"rightStart"|"rightEnd";

type MenuSubExtra = {
    title:string;
    disabled:boolean;
    placement:MenuSubPlacement;
}

export type MenuSubProps = {
    id?:string;
    class?:string;
    title:string;
    placement?:MenuSubPlacement;
    disabled?:boolean;
    extra?:Snippet<[MenuSubExtra]>;
    children:Snippet;
}

</script>

<script lang="ts">
const ctx = getContext<MenuContext>("menu");
if(!ctx) {
    throw new Error("MenuSub not in the Menu!");
}

let {
    id,
    class:className,
    title,
    placement = "rightStart",
    disabled = false,
    extra,
    children,
}:MenuSubProps = $props();

</script>

<Dropdown
    placement={placement}
    trigger="hover"
>
    {#snippet target(ref)}
        <div
            id={id}
            class={meunSubVariants({size:ctx.size, disabled, className})}
            use:ref
        >
            {title}

            {#if extra}
                {@render extra({title, disabled, placement})}
            {/if}

            <ChevronRight 
                size={14}
                class="absolute right-1 text-slate-400 text-sm"
            />
        </div>
    {/snippet}

    {@render children?.()}
</Dropdown>
