<script lang="ts">
import { hasContext, onMount, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

if(!hasContext("menu")) {
    throw new Error("MenuGroup not in the Menu!");
}

type MenuGroupProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    title:string;
    children:Snippet;
}

let {
    id,
    class:className,
    ref,
    children,
    title,
}:MenuGroupProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div
    bind:this={el}
    id={id}
    class={twMerge("w-full h-fit pb-1 mb-1 border-solid border-b border-slate-200", className)}
>
    <div class="w-full h-fit px-4 py-1 text-[13px] text-slate-500">
        {title}
    </div>

    {@render children()}
</div>
