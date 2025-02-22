<script lang="ts">
import { getContext, onMount, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import type { MenuContext } from "./Menu.svelte";

const context = getContext<MenuContext>("menu");
if(!context) {
    throw new Error("MenuItem not in the Menu!");
}

type MenuItemProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    disabled?:boolean;
    label?:string;
    value:string;
    children:Snippet;
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

function oncommand() {
    if(!disabled) {
        context.oncommand?.(value, label);
    }
}

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<button
    aria-label="MenuItem"
    bind:this={el}
    id={id}
    type="button"
    disabled={disabled}
    class={twMerge("flex flex-row w-full h-fit hover:bg-slate-100 disabled:hover:bg-transparent truncate text-sm text-left text-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed p-2 rounded-md", className)}
    onclick={oncommand}
>
    {@render children()}
</button>
