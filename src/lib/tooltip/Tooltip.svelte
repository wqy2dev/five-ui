<script lang="ts" module>
import { type VariantProps, tv } from "tailwind-variants";

const tooltipVariants = tv({
    slots: {
        content: "text-sm p-2 rounded-lg",
        arrow: "",
    },
    variants: {
        theme: {
            light: {
                content: "text-gray-700 bg-white",
                arrow: "shadow-outline-lg bg-white",
            },
            dark: {
                content: "text-white bg-gray-900",
                arrow: "bg-gray-900",
            }
        },
    },
    defaultVariants: {
        theme: "dark",
    },
});

type Theme = VariantProps<typeof tooltipVariants>["theme"];

</script>

<script lang="ts">
import { type PopperProps, default as Popper } from "$lib/popper/Popper.svelte";

interface TooltipProps extends Omit<PopperProps, "when"|"class"|"useArrow"> {
    theme?: Theme;
}

let {
    theme = "dark",
    ...restProps
}:TooltipProps = $props();

const {
    content,
    arrow,
} = tooltipVariants({theme});

</script>

<Popper
    useArrow={true}
    class={{
        outline: "rounded-lg shadow-outline-lg",
        content: content(),
        arrow: arrow(),
    }}
    {...restProps}
/>
