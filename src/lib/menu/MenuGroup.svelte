<script lang="ts">
import { onMount, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

type MenuGroupProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    children:Snippet;
    title:string;
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
    class={twMerge("w-full h-fit pb-2 mb-2 border-solid border-b border-slate-200", className)}
>
    <div class="w-full h-fit px-2 py-1 text-sm text-slate-700 font-bold">
        {title}
    </div>

    {@render children()}
</div>
