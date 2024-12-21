
<script lang="ts">
import { twMerge } from "tailwind-merge";
import { onMount, type Snippet } from "svelte";

type CardContentProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    title:string;
    children:Snippet;
    avatar?:Snippet;
}

let {
    id,
    ref,
    class:className,
    title,
    avatar,
    children,
}:CardContentProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div
    bind:this={el}
    id={id}
    class={twMerge("flex flex-row", className)}
>
    {#if avatar}
        <div class="pr-3 flex items-start">
            {@render avatar()}
        </div>
    {/if}

    <div>
        <div class="text-base font-bold">
            {title}
        </div>
    
        <div class="leading-5 mt-1 text-sm text-slate-400">
            {@render children()}
        </div>
    </div>
</div>
