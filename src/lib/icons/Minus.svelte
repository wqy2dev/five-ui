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

<svg use:mount xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} class={className}>
    <path fill-rule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
</svg>
