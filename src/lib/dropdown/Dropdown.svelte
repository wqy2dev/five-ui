<script lang="ts">
import { type PopperProps, Popper } from "$lib/popper/index.js";
import { twMerge } from "tailwind-merge";

interface DropdownProps extends Omit<PopperProps, "style"|"when"> {
    
}

let {
    class: className,
    children,
    placement = "bottomStart",
    ...restProps
}:DropdownProps = $props();

</script>

<Popper
    class={twMerge("min-w-32 rounded-md text-sm p-1 bg-white shadow-outline-lg", className)}
    useArrow={true}
    arrowClass="shadow-outline-lg"
    placement={placement}
    {...restProps}
>
    {@render children()}
</Popper>
