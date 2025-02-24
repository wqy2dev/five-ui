<script lang="ts" module>
import { type VariantProps, tv } from "tailwind-variants";

const tooltipVariants = tv({
    base: "rounded-lg text-sm p-2",
    variants: {
        theme: {
            light: "bg-white text-gray-900 shadow-outline-lg",
            dark: "bg-gray-900 text-white",
        },
    },
    defaultVariants: {
        theme: "dark",
    },
});

type Theme = VariantProps<typeof tooltipVariants>["theme"];

</script>

<script lang="ts">
import { type PopperProps, default as Popper } from "$lib/popper/popper.svelte";

interface TooltipProps extends PopperProps {
    theme?: Theme;
}

let {
    class: className,
    theme = "dark",
    ...restProps
}:TooltipProps = $props();

</script>

<Popper
    class={tooltipVariants({theme, className})}
    useArrow={true}
    arrowClass={theme === "light" ? "shadow-outline-lg":undefined}
    {...restProps}
/>
