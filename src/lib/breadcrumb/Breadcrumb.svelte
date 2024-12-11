<script lang="ts" module>
import { onMount, setContext, type Snippet } from "svelte";

export type BreadcrumbContext = {
    separator:string;
    sequence:number;
}

type BreadcrumbProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    separator?:string|Snippet;
    children:Snippet;
}

</script>

<script lang="ts">
import { twMerge } from "tailwind-merge";

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
    separator,
    sequence:0,
});

</script>

<ul
    bind:this={el}
    id={id}
    class={twMerge("inline-flex items-center text-sm", className)}
>
    {@render children?.()}
</ul>
