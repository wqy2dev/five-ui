<script lang="ts" module>

type CardProps = {
    id?:string;
    class?:string;
    style?:string;
    ref?:{(el:HTMLElement):void};
    header?:string|Snippet;
    footer?:string|Snippet;
    children?:Snippet;
}

</script>

<script lang="ts">
import { onMount, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

let {
    id,
    ref,
    class:className,
    style,
    header,
    footer,
    children
}:CardProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div
    bind:this={el}
    id={id}
    style={style}
    class={twMerge("shadow-md ring-offset-0 rounded-lg", className)}
>
    {#if header}
        <div>
            {#if header}
                {#if typeof header === "string"}
                    {header}
                {:else}
                    {@render header()}
                {/if}
            {/if}
        </div>
    {/if}

    <div>
        {@render children?.()}
    </div>

    {#if footer}
        <div>
            {#if footer}
                {#if typeof footer === "string"}
                    {footer}
                {:else}
                    {@render footer()}
                {/if}
            {/if}
        </div>
    {/if}
</div>
