<script lang="ts">
import { type IconProps } from "./index.js";

let {
    size = 18,
    class:className,
    ref,
}:IconProps = $props();

function mount(el:SVGElement) {
    ref?.(el);
}
</script>

<svg use:mount xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width={size} height={size} class={className}>
    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
