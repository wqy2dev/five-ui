<script lang="ts" module>
import { type VariantProps, tv } from "tailwind-variants";

const dropdownVariants = tv({
    base: "rounded-lg text-sm p-1.5",
    variants: {
        
    },
    defaultVariants: {

    },
});

</script>

<script lang="ts">
import { type PopperProps, default as Popper } from "$lib/popper/popper.svelte";

interface DropdownProps extends Omit<PopperProps, "style"|"when"|"trigger"> {
    
}

let {
    class: className,
    children,
    placement = "bottom",
    ...restProps
}:DropdownProps = $props();

</script>

<Popper
    class={dropdownVariants({className})}
    ariaLabel="Dropdown"
    arrowShow={true}
    trigger="hover"
    placement={placement}
    {...restProps}
>
    {@render children()}
</Popper>
