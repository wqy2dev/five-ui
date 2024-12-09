<script lang="ts">
import type { Snippet } from "svelte";

interface CardProps {
    id?:string;
    class?: string;
    ref?: {(el:HTMLElement):void};
    variant?: "info"|"success"|"warning"|"danger";
    header?: Snippet;
    footer?: Snippet;
    children: Snippet;
}

let {
    class:className,
    header,
    footer,
    children
}:CardProps = $props();

</script>

<div 
>
    {#if header}
        <div class="card-header">
            {@render header?.()}
        </div>
    {/if}

    <div class="card-body">
        {@render children()}
    </div>

    {#if footer}
        <div class="card-footer">
            {@render footer?.()}
        </div>
    {/if}
</div>

<style lang="scss">

</style>
    