<script lang="ts">
import { mergeClass } from "$lib/utils/index.js";
import type { Snippet } from "svelte";

interface AlertProps {
    id?:string;
    class?: string;
    ref?: {(el:HTMLElement):void};
    variant?: "info"|"success"|"warning"|"danger";
    children: Snippet;
}

let {
    class:className,
    children
}:AlertProps = $props();

</script>

<div class={mergeClass("alert", className)}>
    {@render children()}
</div>

<style lang="scss">

</style>
