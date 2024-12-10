<script lang="ts">
import { onMount, setContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

type BreadcrumbProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    separator?:string|Snippet;
    children:Snippet;
}

let {
    id,
    ref,
    class:className,
    separator = "/",
    children
}:BreadcrumbProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

setContext("breadcrumb", {
    count: 0,
    separator,
});

</script>

<ul
    bind:this={el}
    id={id}
    class={twMerge("inline-flex items-center text-sm", className)}
>
    {@render children?.()}
</ul>
