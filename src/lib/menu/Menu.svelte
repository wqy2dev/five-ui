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
    bind:this={el}
    id={id}
    class={twMerge("min-w-32 max-w-96 h-fit bg-white shadow-outline-md p-2 rounded-md", className)}
>
    {@render children()}
</div>
