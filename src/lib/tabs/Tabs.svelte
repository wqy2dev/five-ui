<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";
import { hasContext, onMount, setContext, type Snippet } from "svelte";

const tabsVariants = tv({
    base: "inline-flex w-fit h-fit p-1.5 rounded-md gap-2",
	variants: {
        variant: {
            solid: "bg-slate-100",
            ghost: "bg-white",
            underlined: "bg-white",
        },
        direction: {
            row: "flex-row",
            col: "flex-col",
        },
        radius: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        },
	},
	defaultVariants: {
        direction: "row",
        radius: "lg",
	},
});

type Radius = VariantProps<typeof tabsVariants>["radius"];
type Variant = VariantProps<typeof tabsVariants>["variant"];
type Direction = VariantProps<typeof tabsVariants>["direction"];

type TabsProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    radius?:Radius;
    direction?:Direction;
    variant?:Variant;
    onchange?:{(key:string):void};
    children:Snippet;
}

export type TabsContext = {
    radius:Radius;
}

</script>

<script lang="ts">

if(!hasContext("tabscontext")) {
    throw new Error("Tabs not in the TabsContext!");
}

let {
    id,
    class:className,
    ref,
    radius = "lg",
    direction = "row",
    children,
}:TabsProps = $props();

let el: HTMLElement;

onMount(() => {
    ref?.(el);
});

setContext("tabs", {
    radius
});

</script>

<div 
    aria-label="Tabs"
    bind:this={el}
    id={id}
    class={tabsVariants({direction, radius, className})}
>
    {@render children()}
</div>
