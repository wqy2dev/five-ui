<script lang="ts">
import { type IconProps } from "./index.ts";

let {
    size = 18,
    class:className,
}:IconProps = $props();

</script>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width={size} height={size} class={className}>
    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
</svg>
