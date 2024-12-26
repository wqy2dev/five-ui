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

interface DropdownProps extends Omit<PopperProps, "style"|"when"> {
    
}

let {
    class: className,
    children,
    ...restProps
}:DropdownProps = $props();

</script>

<Popper
    ariaLabel="Dropdown"
    class={dropdownVariants({className})}
    arrowShow={true}
    {...restProps}
>
    {@render children()}
</Popper>
