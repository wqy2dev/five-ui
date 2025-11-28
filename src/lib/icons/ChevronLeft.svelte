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
    <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
</svg>
  