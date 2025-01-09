<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";
import { hasContext, onMount, setContext, type Snippet } from "svelte";
import type { Color } from "./Tab.svelte";

const tabsVariants = tv({
    base: "flex w-fit h-fit p-1.5 gap-2",
	variants: {
        variant: {
            solid: "bg-slate-100",
            light: "bg-white",
            underlined: "border-solid border-slate-200",
        },
        placement: {
            top: "flex-row",
            bottom: "flex-row",
            left: "flex-col",
            right: "flex-col",
        },
        radius: {
            sm: "",
            md: "",
            lg: "",
            xl: "",
            full: "",
            none: "rounded-none",
        }
	},
    compoundVariants: [
        {
            variant: "underlined",
            class: "p-0",
        },

        {
            variant: "underlined",
            placement: "top",
            class: "border-b",
        },
        {
            variant: "underlined",
            placement: "bottom",
            class: "border-t",
        },
        {
            variant: "underlined",
            placement: "left",
            class: "border-r",
        },
        {
            variant: "underlined",
            placement: "right",
            class: "border-l",
        },

        {
            variant: "solid",
            radius: "sm",
            class: "rounded-sm",
        },
        {
            variant: "solid",
            radius: "md",
            class: "rounded-md",
        },
        {
            variant: "solid",
            radius: "lg",
            class: "rounded-lg",
        },
        {
            variant: "solid",
            radius: "xl",
            class: "rounded-xl",
        },
        {
            variant: "solid",
            radius: "full",
            class: "rounded-full",
        },
    ],
	defaultVariants: {
        variant: "solid",
        placement: "top",
        radius: "lg",
	},
});

type Radius = VariantProps<typeof tabsVariants>["radius"];
type Variant = VariantProps<typeof tabsVariants>["variant"];
type Placement = VariantProps<typeof tabsVariants>["placement"];

type TabBarProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    radius?:Radius;
    placement?:Placement;
    variant?:Variant;
    color?:Color;
    onchange?:{(key:string):void};
    children:Snippet;
}

export type TabBarContext = {
    radius:Radius;
    color:Color;
    variant:Variant;
    placement:Placement;
}

</script>

<script lang="ts">

if(!hasContext("tabs")) {
    throw new Error("TabBar not in the Tabs!");
}

let {
    id,
    class:className,
    ref,
    radius = "lg",
    placement = "top",
    variant = "solid",
    color = "default",
    children,
}:TabBarProps = $props();

setContext<TabBarContext>("tabbar", {
    radius,
    color,
    variant,
    placement,
});

let el: HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div 
    aria-label="TabBar"
    role="tablist"
    bind:this={el}
    id={id}
    class={tabsVariants({variant, placement, radius, className})}
>
    {@render children()}
</div>
