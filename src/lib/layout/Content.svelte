<script lang="ts">
import { hasContext, onMount, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

if(!hasContext("layout")) {
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
    aria-label="LayoutContent"
    id={id}
    style={style}
    class={twMerge("grow shrink-1", className)}
>
    {@render children?.()}
</div>
