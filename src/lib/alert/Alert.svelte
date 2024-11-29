<script module lang="ts">
import { type VariantProps, tv } from "tailwind-variants";
import type { Snippet } from "svelte";

const alertVariants = tv({
	base: "flex rounded-md p-4 text-sm",
	variants: {
		variant: {
			info: "bg-primary-50 text-primary-500",
			success: "bg-green-50 text-green-500",
			warning: "bg-yellow-50 text-yellow-500",
			error: "bg-red-50 text-red-500",
		},
	},
	defaultVariants: {
		variant: "info",
	},
});

type Variant = VariantProps<typeof alertVariants>["variant"];

type AlertProps = {
    id?:string;
    class?: string;
    ref?: {(el:HTMLElement):void};
    variant?: Variant;
    description?: string | Snippet;
    children: Snippet;
}

</script>

<script lang="ts">

let {
    variant,
    class:className,
    children
}:AlertProps = $props();

</script>

<div class={alertVariants({variant, className})}>
    {@render children()}
</div>
