<script lang="ts">
import { hasContext, onMount, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

if(!hasContext("layout")) {
    throw new Error("Side not in the layout context!");
}

type SideProps = {
    id?:string;
    class?:string;
    style?:string;
    ref?:{(el:HTMLElement):void};
    children?:Snippet;
}

let {
    id,
    ref,
    class:className = "",
    style,
    children
}:SideProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>
    
<div
    bind:this={el}
    aria-label="LayoutSide"
    id={id}
    style={style}
    class={twMerge("w-64 shrink-0 transition-all", className)}
>
    {@render children?.()}
</div>
