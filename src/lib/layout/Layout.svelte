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

export type LayoutContext = {
	layout:Layout;
}

</script>

<script lang="ts">

let {
	id,
	ref,
	class:className,
	style,
	layout = "row",
    children
}:LayoutProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

setContext("layout", {
	layout,
});

</script>

<div
	bind:this={el}
	id={id}
	class={layoutVariants({layout, grow: hasContext("layout"), className})}
	style={style}
>
	{@render children?.()}
</div>
