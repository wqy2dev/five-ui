<script lang="ts">
import { type PopperProps, default as Popper } from "$lib/popper/popper.svelte";
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
    class={twMerge("rounded-lg text-sm p-1 bg-white shadow-outline-md", className)}
    ariaLabel="Dropdown"
    arrowShow={true}
    arrowClass="shadow-outline-md"
    placement={placement}
    {...restProps}
>
    {@render children()}
</Popper>
