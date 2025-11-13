<script lang="ts" module>
import { getContext, type Snippet } from "svelte";
import type { MenuContext } from "./Menu.svelte";
import { tv } from "tailwind-variants";
import { Dropdown } from "$lib/index.js";
import { ChevronRight } from "$lib/icons/index.js";

const meunSubVariants = tv({
    base: "relative flex flex-row w-full items-center h-fit hover:bg-slate-100 truncate text-sm text-left text-slate-700 rounded-md cursor-pointer",
    variants: {
        size: {
            sm: "py-1 px-2",
            md: "py-2 px-4",
            lg: "py-3 px-5"
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

type MenuSubProps = {
    id?:string;
    class?:string;
    title:string;
    size?:"sm"|"md"|"lg";
    placement?:"leftStart"|"leftEnd"|"rightStart"|"rightEnd";
    disabled?:boolean;
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
    size = "md",
    placement = "rightStart",
    disabled = false,
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
            class={meunSubVariants({size, disabled, className})}
            use:ref
        >
            {title}
            <ChevronRight 
                size={14}
                class="absolute right-1 text-slate-400 text-sm"
            />
        </div>
    {/snippet}

    {@render children?.()}
</Dropdown>
