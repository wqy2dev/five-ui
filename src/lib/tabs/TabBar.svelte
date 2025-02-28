<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";
import { hasContext, onMount, setContext, type Snippet } from "svelte";
import type { Color } from "./Tab.svelte";

const tabsVariants = tv({
    base: "flex w-fit h-fit p-1 gap-2",
	variants: {
        variant: {
            line: "border-slate-200 border-solid",
            button: "bg-white",
            capsule: "bg-slate-100",
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
            variant: "line",
            class: "p-0",
        },
        {
            variant: "line",
            placement: "top",
            class: "border-b",
        },
        {
            variant: "line",
            placement: "bottom",
            class: "border-t",
        },
        {
            variant: "line",
            placement: "left",
            class: "border-r",
        },
        {
            variant: "line",
            placement: "right",
            class: "border-l",
        },
        {
            variant: "capsule",
            radius: "sm",
            class: "rounded-sm",
        },
        {
            variant: "capsule",
            radius: "md",
            class: "rounded-md",
        },
        {
            variant: "capsule",
            radius: "lg",
            class: "rounded-lg",
        },
        {
            variant: "capsule",
            radius: "xl",
            class: "rounded-xl",
        },
        {
            variant: "capsule",
            radius: "full",
            class: "rounded-full",
        },
    ],
	defaultVariants: {
        radius: "md",
        variant: "line",
        placement: "top",
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
    color = "default",
    radius = "md",
    variant = "line",
    placement = "top",
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
    bind:this={el}
    id={id}
    class={tabsVariants({variant, placement, radius, className})}
>
    {@render children()}
</div>
