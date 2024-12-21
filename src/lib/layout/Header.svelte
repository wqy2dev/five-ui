<script lang="ts">
import { hasContext, onMount, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

if(!hasContext("layout")) {
    throw new Error("Header not in the layout context!");
}

type HeaderProps = {
    id?:string;
    class?:string;
    height?:string;
    style?:string;
    ref?:{(el:HTMLElement):void};
    children?:Snippet;
}

let {
    id,
    ref,
    class:className,
    height = "60px",
    style,
    children
}:HeaderProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>
    
<div
    aria-label="LayoutHeader"
    id={id}
    style={style}
    style:height={height}
    class={twMerge("shrink-0 p-1 shadow-sm", className)}
>
    {@render children?.()}
</div>
