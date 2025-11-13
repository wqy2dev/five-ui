<script lang="ts" module>
import { getContext, type Snippet } from "svelte";
import type { MenuContext } from "./Menu.svelte";
import MenuItem from "./MenuItem.svelte";
import { tv } from "tailwind-variants";
import { Dropdown } from "$lib/index.js";
import { ChevronRight } from "$lib/icons/index.js";

const meunItemVariants = tv({
    base: "flex flex-row w-full h-fit hover:bg-slate-100 disabled:hover:bg-transparent truncate text-sm text-left text-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed rounded-md",
    variants: {
        checked: {
            true: "bg-slate-100",
        },
        size: {
            sm: "py-1 px-2",
            md: "py-2 px-4",
            lg: "py-3 px-5"
        }
    },
    defaultVariants: {
        size: "md",
        checked: false,
    },
});

type MenuSubProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    title:string;
    size?:"sm"|"md"|"lg";
    placement?:"leftStart"|"rightStart";
    disabled?:boolean;
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
    title,
    size = "md",
    placement = "rightStart",
    disabled,
    children,
}:MenuSubProps = $props();

function oncommand(_:Event) {
    if(!disabled) {
        
    }
}

</script>

<Dropdown
    placement={placement}
>
    {#snippet target(ref)}
        <MenuItem
            id={id}
            ref={ref}
            value=""
            size={size}
            class={className}
        >
            {title}
            <ChevronRight 
                size={14}
                class="absolute right-1 top-2.5 text-slate-400 text-sm"
            />
        </MenuItem>
    {/snippet}

    {@render children?.()}
</Dropdown>
