<script lang="ts" module>
import { tv } from "tailwind-variants";
import { onMount, type Snippet } from "svelte";

const spaceVariants = tv({
	base: "flex w-fit h-fit",
	variants: {
        size: {
            xs: "gap-2",
            sm: "gap-4",
            md: "gap-6",
            lg: "gap-8",
            xl: "gap-10",
        },
        layout: {
            row: "flex-row",
            col: "flex-col",
        },
	},
    defaultVariants: {
        layout: "row",
        size: "md",
    },
});

type SpaceProps = {
    id?:string;
    class?:string;
    size?:"xs"|"sm"|"md"|"lg"|"xl";
    layout?:"col"|"row";
    children:Snippet;
    ref?:{(el:HTMLElement):void};
};

</script>

<script lang="ts">

let {
	id,
	ref,
    class:className,
    size = "md",
    layout = "row",
    children,
}:SpaceProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div
    bind:this={el}
	id={id}
    class={spaceVariants({size, layout, className})}
>
    {@render children()}
</div>
