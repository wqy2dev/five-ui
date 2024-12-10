<script lang="ts">
import { getContext, onMount, type Snippet } from "svelte";

const context = getContext("breadcrumb") as any;
if(!context) {
    throw new Error("BreadcrumbItem not in the breadcrumb context!");
}

context.count += 1;

type BreadcrumbItemProps = {
    id?:string;
    href?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    children?:Snippet;
}

let {
    id,
    ref,
    href,
    class:className,
    children,
}:BreadcrumbItemProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<li
    bind:this={el}
    id={id}
    class={className}
>
    {#if context.count > 1}
        <span class="text-secondary-400 px-3">
            {context.separator}
        </span>
    {/if}

    <svelte:element
        this={href ? "a":"span"}
        href={href}
        class="text-secondary-500 hover:text-secondary-600 last:hidden"
    >
        {@render children?.()}
    </svelte:element>
</li>
