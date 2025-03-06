<script lang="ts" module>
import { getContext, onMount, type Snippet } from "svelte";
import type { MenuContext } from "./Menu.svelte";
import { tv } from "tailwind-variants";

const meunItemVariants = tv({
    base: "flex flex-row w-full h-fit hover:bg-slate-100 disabled:hover:bg-transparent truncate text-sm text-left text-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed px-4 py-2 rounded-md",
    variants: {
        checked: {
            true: "bg-slate-100",
        },
    },
    defaultVariants: {
        checked: false,
    },
});

type MenuItemProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    disabled?:boolean;
    label?:string;
    value:string|number;
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
    children,
    label,
    value,
    disabled,
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

let el:HTMLElement;

onMount(() => {
    ref?.(el);

    if(ctx.value === value) {
        ctx.label = label;
        ctx.value = value;
    }
});

</script>

<button
    bind:this={el}
    id={id}
    type="button"
    disabled={disabled}
    class={meunItemVariants({checked, className})}
    onmousedown={oncommand}
>
    {@render children()}
</button>
