<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";
import { getContext, onMount, setContext, type Snippet } from "svelte";
import { type TabsContext} from "./Tabs.svelte";

const tabsVariants = tv({
    base: "flex w-fit h-fit gap-2",
	variants: {
        variant: {
            solid: "bg-slate-100",
            light: "bg-transparent",
            underlined: "border-solid border-b-2 border-slate-200",
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
        size: {
            sm: "p-1",
            md: "p-1.5",
            lg: "p-2",
        },
	},
	defaultVariants: {
        variant: "solid",
        direction: "row",
        radius: "lg",
        size: "md",
	},
});

type Radius = VariantProps<typeof tabsVariants>["radius"];
type Variant = VariantProps<typeof tabsVariants>["variant"];
type Direction = VariantProps<typeof tabsVariants>["direction"];

type TabBarProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    radius?:Radius;
    direction?:Direction;
    variant?:Variant;
    onchange?:{(key:string):void};
    children:Snippet;
}

export type TabBarContext = {
    key:string;
    radius:Radius;
}

</script>

<script lang="ts">

const context = getContext<TabsContext>("tabs");
if(!context) {
    throw new Error("TabBar not in the Tabs!");
}

let {
    id,
    class:className,
    ref,
    radius = "lg",
    direction = "row",
    variant = "solid",
    children,
}:TabBarProps = $props();

let el: HTMLElement;

onMount(() => {
    ref?.(el);
});

setContext<TabBarContext>("tabbar", {
    key:context.key,
    radius,
});

</script>

<div 
    aria-label="Tabs"
    bind:this={el}
    id={id}
    class={tabsVariants({variant, direction, radius, className})}
>
    {@render children()}
</div>
