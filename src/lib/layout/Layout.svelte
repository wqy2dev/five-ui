<script lang="ts" module>

import { type VariantProps, tv } from "tailwind-variants";
import { onMount, setContext, hasContext, type Snippet } from "svelte";

const layoutVariants = tv({
	base: "flex",
	variants: {
		layout: {
            row: "flex-row",
            col: "flex-col",
        },
		grow: {
			true: "grow shrink-0",
		},
	},
	defaultVariants: {
		layout: "row",
	},
});

type Layout = VariantProps<typeof layoutVariants>["layout"];

type LayoutProps = {
	id?:string;
    class?:string;
	style?:string;
    ref?:{(el:HTMLElement):void};
    children?:Snippet;
    layout?:Layout;
}

</script>

<script lang="ts">

let {
	id,
	ref,
	class:className,
	style,
	layout,
    children
}:LayoutProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

const isGrow = hasContext("layout");

setContext("layout", {});

</script>

<div
    aria-label="Layout"
	id={id}
	class={layoutVariants({layout, grow: isGrow, className})}
	style={style}
>
	{@render children?.()}
</div>
