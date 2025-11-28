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
    <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
</svg>
  