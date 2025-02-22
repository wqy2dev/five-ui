<script lang="ts" module>

export type MenuContext = {
    oncommand?:{(value:string, label?:string):void};
}

type MenuProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    children:Snippet;
    oncommand?:{(value:string, label?:string):void};
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
    class={twMerge("w-full h-fit bg-white", className)}
>
    {@render children()}
</div>
