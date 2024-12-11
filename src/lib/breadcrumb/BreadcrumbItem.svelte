<script lang="ts" module>
import { getContext, onMount, type Snippet } from "svelte";

type BreadcrumbItemProps = {
    id?:string;
    href?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    children:Snippet;
}

</script>

<script lang="ts">
import { type BreadcrumbContext } from "./Breadcrumb.svelte";

const context = getContext("breadcrumb") as BreadcrumbContext;
if(!context) {
    throw new Error("BreadcrumbItem not in the breadcrumb context!");
}

let {
    id,
    ref,
    href,
    class:className,
    children,
}:BreadcrumbItemProps = $props();

// sequence
const sequence = ++context.sequence;

let last = $state(true);
let el:HTMLElement;

onMount(() => {
    ref?.(el);

    last = context.sequence === sequence;
});

</script>

<li
    bind:this={el}
    id={id}
    class={className}
>
    <svelte:element
        this={href ? "a":"span"}
        href={href}
        class={last ? "text-secondary-700":"text-secondary-500 hover:text-secondary-600"}
    >
        {@render children()}
    </svelte:element>

    {#if !last}
        <span class="text-secondary-400 px-2">
            {context.separator}
        </span>
    {/if}
</li>
