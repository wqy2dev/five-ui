<script lang="ts" module>

export type MenuContext = {
    oncommand?:{(key:string):void};
}

type MenuProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    children:Snippet;
    oncommand?:{(key:string):void};
}

</script>

<script lang="ts">
import { onMount, setContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

let {
    id,
    ref,
    class:className,
    children,
    oncommand,
}:MenuProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

setContext("menu", {
    oncommand,
});

</script>

<div
    aria-label="Menu"
    bind:this={el}
    id={id}
    class={twMerge("min-w-32 w-20 h-fit p-1 rounded-md bg-white border border-solid border-slate-200 shadow-outline-sm", className)}
>
    {@render children()}
</div>
