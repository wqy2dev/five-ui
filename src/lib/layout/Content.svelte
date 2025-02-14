<script lang="ts">
import { getContext, onMount, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { type LayoutContext } from "./Layout.svelte";

const ctx = getContext("layout") as LayoutContext;
if(!ctx) {
    throw new Error("Content not in the layout context!");
}

type ContentProps = {
    id?:string;
    class?:string;
    style?:string;
    ref?:{(el:HTMLElement):void};
    children?:Snippet;
}

let {
    id,
    ref,
    class:className,
    style,
    children
}:ContentProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div
    bind:this={el}
    id={id}
    style={style}
    class={twMerge(`${ctx.layout === "row" ? "w-0 h-full":"w-full h-0"} grow shrink-0`, className)}
>
    {@render children?.()}
</div>
