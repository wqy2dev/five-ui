<script lang="ts">
import { onMount, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

type MenuProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    children:Snippet;
}

let {
    id,
    ref,
    class:className,
    children,
}:MenuProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div
    bind:this={el}
    id={id}
    class={twMerge("min-w-32 max-w-96 h-fit bg-white shadow-outline-md p-2 rounded-md", className)}
>
    {@render children()}
</div>
