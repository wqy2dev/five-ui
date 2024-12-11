<script lang="ts">
import { hasContext, onMount, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

if(!hasContext("layout")) {
    throw new Error("Side not in the layout context!");
}

type SideProps = {
    id?:string;
    class?:string;
    width?:string;
    style?:string;
    collapsible?:boolean;
    collapsedWidth?:string;
    ref?:{(el:HTMLElement):void};
    children?:Snippet;
}

let {
    id,
    ref,
    class:className = "",
    width = "200px",
    style,
    collapsible,
    collapsedWidth = "60px",
    children
}:SideProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>
    
<div
    id={id}
    style={style}
    style:width={collapsible ? collapsedWidth : width}
    class={twMerge("bg-slate-100 shrink-0 transition-all", className)}
>
    {@render children?.()}
</div>
